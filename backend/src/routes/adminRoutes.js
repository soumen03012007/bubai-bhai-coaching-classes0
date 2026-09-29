const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { requireAuth, signToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const admin = await prisma.admin.findUnique({ where: { email: String(email).trim() } });
  if (!admin) {
    return res.status(401).json({ message: 'Invalid admin credentials.' });
  }

  const isMatch = await bcrypt.compare(String(password), admin.password_hash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid admin credentials.' });
  }

  const token = signToken({ id: admin.id, email: admin.email });

  return res.json({
    token,
    admin: { id: admin.id, email: admin.email },
  });
});

router.get('/dashboard', requireAuth, async (req, res) => {
  try {
    const [total, pending, contacted, enrolled, rejected] = await Promise.all([
      prisma.application.count(),
      prisma.application.count({ where: { application_status: 'Pending' } }),
      prisma.application.count({ where: { application_status: 'Contacted' } }),
      prisma.application.count({ where: { application_status: 'Enrolled' } }),
      prisma.application.count({ where: { application_status: 'Rejected' } }),
    ]);

    return res.json({ total, pending, contacted, enrolled, rejected });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load dashboard statistics.' });
  }
});

router.get('/applications', requireAuth, async (req, res) => {
  try {
    const { classLevel, subject, status, search } = req.query;
    const where = {};

    if (classLevel && classLevel !== 'all') where.class_level = Number(classLevel);
    if (status && status !== 'all') where.application_status = status;
    if (subject && subject !== 'all') {
      where.subjects = { contains: String(subject) };
    }
    if (search) {
      where.OR = [
        { full_name: { contains: String(search) } },
        { phone_number: { contains: String(search) } },
        { whatsapp_number: { contains: String(search) } },
        { email: { contains: String(search) } },
      ];
    }

    const applications = await prisma.application.findMany({
      where,
      orderBy: { created_at: 'desc' },
    });

    return res.json(applications);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load applications.' });
  }
});

module.exports = router;
