const express = require('express');
const { authenticateJWT } = require('../middlewares/authenticateJWT.js');
const studentController = require('../controllers/studentController.js');
const upload = require('../config/multerConfig.js');
const { restrictTo } = require('../middlewares/restrictTo.js');

const router = express.Router();

// for authorized students

router.use(authenticateJWT);

router.get(
  '/me',
  restrictTo('student'),
  studentController.getMe,
  studentController.getStudent
);

router.patch(
  '/updateMyPhoto',
  restrictTo('student'),
  upload.single('photo'),
  studentController.updatePhoto
);

router.patch('/updateMe', restrictTo('student'), studentController.updateMe);

router.patch(
  '/request-instructor/:instructorId',
  restrictTo('student'),
  studentController.requestAssignInstructor
);

// for admin

router.use(restrictTo('admin'));

router.get('/', studentController.getAllStudents);
router.get(
  '/requests',
  studentController.getStudentsWithInstructorRequest,
  studentController.getAllStudents
);
router.get('/:studentId', studentController.getStudent);

router.patch(
  '/:studentId/accept-request',
  studentController.acceptRequest,
  studentController.updateStudent
);

module.exports = router;
