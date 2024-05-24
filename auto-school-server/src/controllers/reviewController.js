const catchAsync = require('../helpers/catchAsync.js');
const ReviewModel = require('../models/review.js');

exports.getAllReviews = catchAsync(async (req, res, next) => {});

exports.addReview = catchAsync(async (req, res, next) => {
  // TODO: Check if Student belongs to the Instructor

  const newReview = await ReviewModel.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
