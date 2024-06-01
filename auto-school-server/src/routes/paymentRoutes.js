const express = require('express');
const { authenticateJWT } = require('../middlewares/authenticateJWT.js');
const { restrictTo } = require('../middlewares/restrictTo.js');
const paymentController = require('../controllers/paymentController.js');

const router = express.Router();

router.get(
  '/balance',
  authenticateJWT,
  restrictTo('student'),
  paymentController.getBalance
);

router.get(
  '/:studentId',
  authenticateJWT,
  restrictTo('admin'),
  paymentController.getStudentPayments
);

router.post(
  '/',
  authenticateJWT,
  restrictTo('student'),
  paymentController.createPayment
);

module.exports = router;
