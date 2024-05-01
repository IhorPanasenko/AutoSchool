const express = require('express');
const { validateSchema } = require('../middlewares/validateSchema.js');
const instructorController = require('../controllers/instructorController.js');
const { createInstructorSchema } = require('../helpers/validationSchemas.js');
const AppError = require('../helpers/appError.js');
const upload = require('../config/multerConfig.js');
const { authenticateJWT } = require('../middlewares/authenticateJWT.js');
const { restrictTo } = require('../middlewares/restrictTo.js');

const router = express.Router();

router.get('/', instructorController.getAllInstructors);
router.get('/:instructorId', instructorController.getOneInstructor);

// for administrator

router.use(authenticateJWT);
router.use(restrictTo('admin'));

router.patch(
  '/:instructorId',
  upload.single('photo'),
  instructorController.updateInstructor
);

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
