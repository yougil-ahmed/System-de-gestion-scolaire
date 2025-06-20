const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getById);
router.post('/', userController.createUser);
// router.put('/:id', userController.update);
router.delete('/:id', userController.deleteUser);

module.exports = router;
