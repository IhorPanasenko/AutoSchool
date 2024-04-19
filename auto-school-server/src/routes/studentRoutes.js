const express = require('express');
const { authenticateJWT } = require('../middlewares/authenticateJWT.js');
const studentController = require('../controllers/studentController.js');
const upload = require('../config/multerConfig.js');

const router = express.Router();

router.patch(
  '/updateMyPhoto',
  authenticateJWT,
  upload.single('photo'),
  studentController.updatePhoto
);

module.exports = router;
