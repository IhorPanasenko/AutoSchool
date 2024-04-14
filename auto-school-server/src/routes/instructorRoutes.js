const express = require('express');
const multer = require('multer');
const { validateSchema } = require('../middlewares/validateSchema.js');
const instructorController = require('../controllers/instructorController.js');
const { createInstructorSchema } = require('../helpers/validationSchemas.js');
const AppError = require('../helpers/appError.js');

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image. Please upload only images', 400), false);
  }
};

const upload = multer({ fileFilter: multerFilter });

const router = express.Router();

router.get('/', instructorController.getAllInstructors);
router.get('/:instructorId', instructorController.getOneInstructor);

router.patch('/:instructorId', instructorController.updateInstructor);

router.post(
  '/',
  upload.fields([
    { name: 'instructorPhoto', maxCount: 1 },
    { name: 'carPhoto', maxCount: 1 },
  ]),
  validateSchema(createInstructorSchema),
  instructorController.createInstructor
);

router.delete('/:instructorId', instructorController.deleteInstructor);

module.exports = router;
