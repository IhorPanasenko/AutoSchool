const AppError = require('../helpers/appError.js');
const catchAsync = require('../helpers/catchAsync.js');
const LessonModel = require('../models/lesson.js');
const StudentModel = require('../models/student.js');

exports.getInstructorSchedule = catchAsync(async (req, res, next) => {
  const lessons = await LessonModel.find({
    instructorId: req.params.instructorId,
  });

  res.status(200).json({
    status: 'success',
    data: lessons,
  });
});

exports.getMyLessons = catchAsync(async (req, res, next) => {
  const student = await StudentModel.findOne({ userId: req.user._id }).select(
    '_id'
  );

  const lessons = await LessonModel.find({ 'student.studentId': student._id });

  res.status(200).json({
    status: 'success',
    results: lessons.length,
    data: lessons,
  });
});

exports.signupForLesson = catchAsync(async (req, res, next) => {
  const student = await StudentModel.findOne({ userId: req.user._id }).select(
    'instructorId requestStatus name surname'
  );

  if (!student.instructorId || student.requestStatus !== 'validated') {
    return next(
      new AppError(
        'You have to be assign to instructor to signup for a lesson',
        403
      )
    );
  }

  const updatedLesson = await LessonModel.findOneAndUpdate(
    { _id: req.params.lessonId, isAvailable: true },
    {
      'student.studentId': student._id,
      'student.name': student.name,
      'student.surname': student.surname,
      isAvailable: false,
    },
    { new: true }
  );

  if (!updatedLesson)
    return next(new AppError('This lesson is not available', 400));

  res.status(200).json({
    status: 'success',
    message: 'You successfully signed up for the lesson',
    data: updatedLesson,
  });
});
