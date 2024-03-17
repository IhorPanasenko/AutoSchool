const express = require('express');
const instructorController = require('../controllers/instructorController.js');

const router = express.Router();

router.get('/', instructorController.getAllInstructors);
router.post('/', instructorController.createInstructor);

module.exports = router;
