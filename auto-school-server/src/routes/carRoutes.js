const express = require('express');
const upload = require('../config/multerConfig.js');
const carController = require('../controllers/carController.js');
const { authenticateJWT } = require('../middlewares/authenticateJWT.js');
const { restrictTo } = require('../middlewares/restrictTo.js');

const router = express.Router();

router.get('/', carController.getAllCars);

router.patch(
  '/:carId',
  authenticateJWT,
  restrictTo('admin'),
  upload.single('photo'),
  carController.updateCar
);

router.patch(
  '/:carId/ratings',
  authenticateJWT,
  restrictTo('student'),
  carController.addRating
);

module.exports = router;
