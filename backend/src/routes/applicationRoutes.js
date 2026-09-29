const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { calculateMonthlyFee, VALID_CLASSES, VALID_SUBJECTS } = require('../utils/feeUtils');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

function isValidPhone(phone) {
  return /^\d{10}$/.test(String(phone).replace(/\s+/g, ''));
}

function isValidEmail(email) {
  if (!email || !String(email).trim()) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

router.get('/', requireAuth, async (req, res) => {
  try {
    const { classLevel, subject, status, search } = req.query;
    const where = {};

    if (classLevel && classLevel !== 'all') where.class_level = Number(classLevel);
    if (status && status !== 'all') where.application_status = status;
    if (subject && subject !== 'all') {
      where.subjects = { contains: subject };
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

router.get('/:id', requireAuth, async (req, res) => {
  try {
    const application = await prisma.application.findUnique({ where: { id: Number(req.params.id) } });
    if (!application) return res.status(404).json({ message: 'Application not found.' });
    return res.json(application);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load this application.' });
  }
});

router.post('/', async (req, res) => {
  const { full_name, class_level, subjects, phone_number, whatsapp_number, email } = req.body || {};

  if (!full_name || !String(full_name).trim()) {
    return res.status(400).json({ message: 'Full name is required.' });
  }

  if (!VALID_CLASSES.includes(Number(class_level))) {
    return res.status(400).json({ message: 'Please select a valid class.' });
  }

  if (!Array.isArray(subjects) || subjects.length === 0) {
    return res.status(400).json({ message: 'Please select at least one subject.' });
  }

  const invalidSubject = subjects.find((subject) => !VALID_SUBJECTS.includes(String(subject).trim()));
  if (invalidSubject) {
    return res.status(400).json({ message: `Invalid subject selected: ${invalidSubject}` });
  }

  if (!phone_number || !isValidPhone(phone_number)) {
    return res.status(400).json({ message: 'A valid 10-digit phone number is required.' });
  }

  if (!whatsapp_number || !isValidPhone(whatsapp_number)) {
    return res.status(400).json({ message: 'A valid 10-digit WhatsApp number is required.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }

  const normalizedSubjects = [...new Set(subjects.map((subject) => String(subject).trim()))];
  const monthlyFee = calculateMonthlyFee(Number(class_level), normalizedSubjects);

  const recentWindow = new Date(Date.now() - 15 * 60 * 1000);
  const duplicate = await prisma.application.findFirst({
    where: {
      phone_number: String(phone_number).trim(),
      created_at: { gte: recentWindow },
      class_level: Number(class_level),
      subjects: { contains: normalizedSubjects.join(',') },
    },
  });

  if (duplicate) {
    return res.status(409).json({
      message: 'A recent application with the same phone number and course details already exists. Please wait a few minutes and try again.',
    });
  }

  try {
    const application = await prisma.application.create({
      data: {
        full_name: String(full_name).trim(),
        class_level: Number(class_level),
        subjects: normalizedSubjects.join(', '),
        phone_number: String(phone_number).trim(),
        whatsapp_number: String(whatsapp_number).trim(),
        email: email ? String(email).trim() : null,
        monthly_fee: monthlyFee,
        application_status: 'Pending',
      },
    });

    return res.status(201).json({
      message: 'Application submitted successfully.',
      data: application,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong while submitting your application. Please try again.' });
  }
});

router.patch('/:id/status', requireAuth, async (req, res) => {
  const { status } = req.body || {};
  const validStatus = ['Pending', 'Contacted', 'Enrolled', 'Rejected'];

  if (!validStatus.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value.' });
  }

  try {
    const application = await prisma.application.update({
      where: { id: Number(req.params.id) },
      data: { application_status: status },
    });
    return res.json(application);
  } catch (error) {
    return res.status(404).json({ message: 'Application not found.' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.application.delete({ where: { id: Number(req.params.id) } });
    return res.json({ message: 'Application deleted successfully.' });
  } catch (error) {
    return res.status(404).json({ message: 'Application not found.' });
  }
});

module.exports = router;
