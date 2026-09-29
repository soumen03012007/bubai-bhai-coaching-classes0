const siteConfig = {
  teacher: {
    name: 'BUBAI MONDAL',
    role: 'Owner & Teacher',
    photo: '/assets/bubai-owner.jpeg',
    intro:
      'Personalized online coaching for students from Class 5 to Class 10 with a focus on strong fundamentals, conceptual understanding, and measurable academic improvement.',
    experience: '6+ years of coaching experience helping students build confidence, improve scores, and develop a strong academic foundation.',
    philosophy:
      'Every student learns differently. I focus on clarity, consistency, and confidence so each learner can progress steadily with a strong conceptual base.',
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    coachingHours: 'Mon - Sat: 4:00 PM - 8:30 PM',
  },
  contact: {
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    email: 'bubaimondalcoaching@example.com',
    address: 'Online Coaching / Remote Sessions, West Bengal, India',
  },
  classes: [5, 6, 7, 8, 9, 10],
  subjects: ['Mathematics', 'Physics', 'Chemistry'],
  fees: {
    '5-8': { Mathematics: 300, Physics: 250, Chemistry: 250 },
    '9-10': { Mathematics: 500, Physics: 500, Chemistry: 500 },
  },
  successStories: [
    { name: 'Aarav Sen', classLevel: 10, subject: 'Mathematics', achievement: '95%', year: '2025' },
    { name: 'Riya Das', classLevel: 9, subject: 'Physics', achievement: '92%', year: '2025' },
    { name: 'Soham Roy', classLevel: 8, subject: 'Chemistry', achievement: '90%', year: '2024' },
  ],
};

module.exports = { siteConfig };
