const express = require('express');
const { authenticateJWT } = require('../middlewares/authenticateJWT.js');
const { restrictTo } = require('../middlewares/restrictTo.js');
const reviewController = require('../controllers/reviewController.js');

const router = express.Router({ mergeParams: true });

router.get('/', reviewController.getAllReviews);

router.post(
  '/',
  authenticateJWT,
  restrictTo('student'),
  reviewController.createReview
);

module.exports = router;
