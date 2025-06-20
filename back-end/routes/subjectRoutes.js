const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

router.get('/', subjectController.getAllSubjects);
// router.get('/:id', subjectController.getById);
router.post('/', subjectController.createSubject);
router.put('/:id', subjectController.updateSubject);
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;
