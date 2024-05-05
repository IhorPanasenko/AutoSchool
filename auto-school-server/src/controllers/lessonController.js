const catchAsync = require('../helpers/catchAsync.js');
const LessonModel = require('../models/lesson.js');

exports.getInstructorSchedule = catchAsync(async (req, res, next) => {
  const lessons = await LessonModel.find({
    instructorId: req.params.instructorId,
  });

  res.status(200).json({
    status: 'success',
    data: lessons,
  });
});
