const { Classroom, Student } = require('../models');

exports.getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.findAll({ include: Student });
    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.create(req.body);
    res.status(201).json(classroom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateClassroom = async (req, res) => {
  try {
    await Classroom.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Classroom updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteClassroom = async (req, res) => {
  try {
    await Classroom.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Classroom deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};