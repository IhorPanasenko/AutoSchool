const express = require('express');
const { authenticateJWT } = require('../middlewares/authenticateJWT.js');
const studentController = require('../controllers/studentController.js');
const upload = require('../config/multerConfig.js');

const router = express.Router();

// for authorized user

router.get(
  '/me',
  authenticateJWT,
  studentController.getMe,
  studentController.getStudent
);

router.patch(
  '/updateMyPhoto',
  authenticateJWT,
  upload.single('photo'),
  studentController.updatePhoto
);

router.patch('/updateMe', authenticateJWT, studentController.updateMe);

// for admin

router.get('/', studentController.getAllStudents);
router.get('/:studentId', studentController.getStudent);

module.exports = router;
