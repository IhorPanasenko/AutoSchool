const catchAsync = require('../helpers/catchAsync.js');
const ReviewModel = require('../models/review.js');
const StudentModel = require('../models/student.js');
const InstructorModel = require('../models/instructor.js');
const AppError = require('../helpers/appError.js');

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
  const student = await StudentModel.findOne(
    (req.body.studentId && { _id: req.body.studentId }) ||
      (req.user._id && { userId: req.user._id })
  ).select('_id instructorId');

  if (!req.body.instructorId) req.body.instructorId = req.params.instructorId;
  if (!req.body.studentId) req.body.studentId = student._id;

  if (!student.instructorId?.equals(req.body.instructorId))
    return next(
      new AppError("Only instructor's students can leave a review", 403)
    );

  const newReview = await ReviewModel.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
