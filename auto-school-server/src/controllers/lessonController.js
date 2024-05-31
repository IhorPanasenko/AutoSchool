const AppError = require('../helpers/appError.js');
const catchAsync = require('../helpers/catchAsync.js');
const LessonModel = require('../models/lesson.js');
const StudentModel = require('../models/student.js');
const {
  googleCalendar,
  oauth2Client,
} = require('../config/googleOauth2Client.js');
const createGoogleDateTime = require('../helpers/createGoogleDateTime.js');
const UserLoginModel = require('../models/userLogin.js');

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

  const updatedLesson = await LessonModel.findOne({
    _id: req.params.lessonId,
    isAvailable: true,
  });

  if (!updatedLesson)
    return next(new AppError('This lesson is not available', 400));

  if (!updatedLesson.instructorId.equals(student.instructorId))
    return next(
      new AppError("You can sign up only for your instructor's lessons", 403)
    );

  updatedLesson.student.studentId = student._id;
  updatedLesson.student.name = student.name;
  updatedLesson.student.surname = student.surname;
  updatedLesson.isAvailable = false;
  await updatedLesson.save();

  res.status(200).json({
    status: 'success',
    message: 'You successfully signed up for the lesson',
    data: updatedLesson,
  });
});

exports.cancelLesson = catchAsync(async (req, res, next) => {
  const lesson = await LessonModel.findById(req.params.lessonId);

  if (lesson.student.studentId)
    return next(new AppError('You can not cancel already booked lesson', 400));

  lesson.isAvailable = false;
  await lesson.save();

  res.status(200).json({
    status: 'success',
    message: 'Lesson was successfully canceled',
    data: lesson,
  });
});

exports.cancelMyLesson = catchAsync(async (req, res, next) => {
  const lesson = await LessonModel.findById(req.params.lessonId);

  const student = await StudentModel.findOne({ userId: req.user._id });

  if (!lesson.student.studentId.equals(student._id))
    return next(new AppError("You can not cancel other student's lesson", 403));

  const day = 24 * 60 * 60 * 1000;

  if (new Date() > lesson.date - day)
    return next(
      new AppError(
        'You can not cancel a lesson later than 24 hours before before its scheduled time.'
      )
    );

  lesson.student = undefined;
  lesson.isAvailable = true;
  await lesson.save();

  res.status(200).json({
    status: 'success',
    message: 'You cancelled the lesson successfully.',
    data: lesson,
  });
});

exports.addLessonToGoogleCalendar = catchAsync(async (req, res, next) => {
  const lesson = await LessonModel.findById(req.params.lessonId);
  const event = {
    summary: 'Lesson in AutoSchool',
    start: {
      dateTime: createGoogleDateTime(lesson.date, lesson.fromHour),
    },
    end: {
      dateTime: createGoogleDateTime(lesson.date, lesson.toHour),
    },
  };

  const user = await UserLoginModel.findOne({ userId: req.user._id });
  const refreshToken = user.googleRefreshToken;

  if (!refreshToken)
    return next(
      new AppError(
        'You have to login with google to add lesson to calendar',
        400
      )
    );

  oauth2Client.setCredentials({ refresh_token: refreshToken });

  await googleCalendar(oauth2Client).events.insert({
    calendarId: 'primary',
    resource: event,
  });

  res.status(200).json({
    status: 'success',
    message: 'Event added to Google Calendar',
  });
});
