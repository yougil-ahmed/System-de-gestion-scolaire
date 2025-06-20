const { Teacher, Subject } = require('../models');

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll({ include: Subject });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const photo_path = req.file ? req.file.path : 'teachers/default.jpg';
    const teacher = await Teacher.create({
      ...req.body,
      teacher_num: await generateTeacherNumber(),
      photo_path
    });
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const photo_path = req.file ? req.file.path : undefined;
    await Teacher.update({ ...req.body, photo_path }, { where: { id: req.params.id } });
    res.json({ message: 'Teacher updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    await Teacher.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

async function generateTeacherNumber() {
  const last = await Teacher.findOne({ order: [['teacher_num', 'DESC']] });
  let lastNum = last ? parseInt(last.teacher_num.split('-')[1]) + 1 : 1;
  return `TN-${String(lastNum).padStart(6, '0')}`;
}