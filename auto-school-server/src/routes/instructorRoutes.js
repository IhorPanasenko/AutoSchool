const express = require('express');
const { validateSchema } = require('../middlewares/validateSchema.js');
const instructorController = require('../controllers/instructorController.js');
const { createInstructorSchema } = require('../helpers/validationSchemas.js');

const router = express.Router();

router.get('/', instructorController.getAllInstructors);
router.get('/:instructorId', instructorController.getOneInstructor);

router.patch('/:instructorId', instructorController.updateInstructor);

router.post(
  '/',
  validateSchema(createInstructorSchema),
  instructorController.createInstructor
);

module.exports = router;
