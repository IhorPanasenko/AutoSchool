const express = require('express');
const { authenticateJWT } = require('../middlewares/authenticateJWT.js');
const { restrictTo } = require('../middlewares/restrictTo.js');
const paymentController = require('../controllers/paymentController.js');

const router = express.Router();

router.post(
  '/',
  authenticateJWT,
  restrictTo('student'),
  paymentController.createPayment
);

module.exports = router;
