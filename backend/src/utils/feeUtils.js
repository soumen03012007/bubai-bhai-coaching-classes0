const { siteConfig } = require('../config');

const VALID_CLASSES = siteConfig.classes;
const VALID_SUBJECTS = siteConfig.subjects;

function getFeeSchedule(classLevel) {
  if (!VALID_CLASSES.includes(Number(classLevel))) {
    throw new Error('Invalid class selected.');
  }

  return Number(classLevel) >= 9 ? siteConfig.fees['9-10'] : siteConfig.fees['5-8'];
}

function calculateMonthlyFee(classLevel, selectedSubjects) {
  if (!selectedSubjects || !Array.isArray(selectedSubjects) || selectedSubjects.length === 0) {
    throw new Error('At least one subject must be selected.');
  }

  const normalized = selectedSubjects.map((subject) => String(subject).trim());
  const invalidSubject = normalized.find((subject) => !VALID_SUBJECTS.includes(subject));

  if (invalidSubject) {
    throw new Error(`Invalid subject selected: ${invalidSubject}`);
  }

  const uniqueSubjects = [...new Set(normalized)];
  const feeSchedule = getFeeSchedule(classLevel);
  const total = uniqueSubjects.reduce((sum, subject) => sum + Number(feeSchedule[subject] || 0), 0);

  if (!Number.isFinite(total) || total <= 0) {
    throw new Error('Unable to calculate the monthly fee.');
  }

  return total;
}

module.exports = {
  calculateMonthlyFee,
  getFeeSchedule,
  VALID_CLASSES,
  VALID_SUBJECTS,
};
