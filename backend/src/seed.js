const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  const adminHash = await bcrypt.hash(adminPassword, 10);

  await prisma.admin.upsert({
    where: { email: adminEmail },
    create: {
      email: adminEmail,
      password_hash: adminHash,
    },
    update: {
      password_hash: adminHash,
    },
  });

  const existingCount = await prisma.application.count();
  if (existingCount === 0) {
    await prisma.application.createMany({
      data: [
        {
          full_name: 'Rahul Das',
          class_level: 8,
          subjects: 'Mathematics, Physics',
          phone_number: '9876543210',
          whatsapp_number: '9876543210',
          email: 'rahul@example.com',
          monthly_fee: 550,
          application_status: 'Pending',
        },
        {
          full_name: 'Priya Sen',
          class_level: 9,
          subjects: 'Mathematics, Physics, Chemistry',
          phone_number: '9898989898',
          whatsapp_number: '9898989898',
          email: 'priya@example.com',
          monthly_fee: 1500,
          application_status: 'Contacted',
        },
        {
          full_name: 'Arjun Roy',
          class_level: 7,
          subjects: 'Chemistry',
          phone_number: '9000070001',
          whatsapp_number: '9000070001',
          email: 'arjun@example.com',
          monthly_fee: 250,
          application_status: 'Enrolled',
        },
      ],
    });
  }

  console.log('Database seeded with demo admin and applications.');
}

seed()
  .catch((error) => {
    console.error('Seed error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
