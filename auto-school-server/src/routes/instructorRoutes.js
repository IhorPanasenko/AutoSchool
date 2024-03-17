const express = require('express');
const { validateSchema } = require('../middlewares/validateSchema.js');
const instructorController = require('../controllers/instructorController.js');
const { createInstructorSchema } = require('../helpers/validationSchemas.js');

const router = express.Router();

router.get('/', instructorController.getAllInstructors);
router.post(
  '/',
  validateSchema(createInstructorSchema),
  instructorController.createInstructor
);

module.exports = router;
