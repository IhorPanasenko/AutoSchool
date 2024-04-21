const express = require('express');
const { authenticateJWT } = require('../middlewares/authenticateJWT.js');
const studentController = require('../controllers/studentController.js');
const upload = require('../config/multerConfig.js');

const router = express.Router();

// for authorized user

router.patch(
  '/updateMyPhoto',
  authenticateJWT,
  upload.single('photo'),
  studentController.updatePhoto
);

// for admin

router.get('/', studentController.getAllStudents);
router.get('/:studentId', studentController.getStudent);

module.exports = router;
