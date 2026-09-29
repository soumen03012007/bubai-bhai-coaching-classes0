const express = require('express');
const { calculateMonthlyFee, VALID_CLASSES, VALID_SUBJECTS } = require('../utils/feeUtils');

const router = express.Router();

router.post('/calculate', (req, res) => {
  const { class_level, subjects } = req.body || {};

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

  try {
    const monthlyFee = calculateMonthlyFee(Number(class_level), subjects);
    return res.json({
      class_level: Number(class_level),
      subjects: [...new Set(subjects.map((subject) => String(subject).trim()))],
      monthly_fee: monthlyFee,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
