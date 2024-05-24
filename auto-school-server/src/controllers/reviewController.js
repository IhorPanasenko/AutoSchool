const catchAsync = require('../helpers/catchAsync.js');
const ReviewModel = require('../models/review.js');
const StudentModel = require('../models/student.js');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.instructorId)
    filter = { instructorId: req.params.instructorId };

  const reviews = await ReviewModel.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // TODO: Check if Student belongs to the Instructor

  if (!req.body.instructorId) req.body.instructorId = req.params.instructorId;
  if (!req.body.studentId) {
    const student = await StudentModel.findOne({ userId: req.user._id }).select(
      '_id'
    );
    req.body.studentId = student._id;
  }

  const newReview = await ReviewModel.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
