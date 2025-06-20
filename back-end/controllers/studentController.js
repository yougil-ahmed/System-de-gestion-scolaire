const { Student, Classroom } = require('../models');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({ include: Classroom });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create({
      ...req.body,
      student_num: await generateStudentNumber()
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    await Student.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Student updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

async function generateStudentNumber() {
  const last = await Student.findOne({ order: [['student_num', 'DESC']] });
  let lastNum = last ? parseInt(last.student_num.split('-')[1]) + 1 : 1;
  return `STDN-${String(lastNum).padStart(6, '0')}`;
}