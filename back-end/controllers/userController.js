const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: { id: { [Op.ne]: req.user.id } } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      photo_path: 'users/blank-profile.png'
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (req.user.id !== parseInt(req.params.id)) {
      await User.destroy({ where: { id: req.params.id } });
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(403).json({ error: "You can't delete yourself." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
