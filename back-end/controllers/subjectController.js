const { Subject, Teacher, Classroom } = require('../models');

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll({ include: [Teacher, Classroom] });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSubject = async (req, res) => {
  try {
    const subject = await Subject.create({
      ...req.body,
      subject_code: await generateSubjectNumber()
    });
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    await Subject.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Subject updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    await Subject.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

async function generateSubjectNumber() {
  const last = await Subject.findOne({ order: [['subject_code', 'DESC']] });
  let lastNum = last ? parseInt(last.subject_code.split('-')[1]) + 1 : 1;
  return `SC-${String(lastNum).padStart(6, '0')}`;
}
