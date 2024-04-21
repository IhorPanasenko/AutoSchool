const mongoose = require('mongoose');
const StudentModel = require('../models/student.js');
const catchAsync = require('../helpers/catchAsync.js');
const AppError = require('../helpers/appError.js');
const s3 = require('../config/s3Bucket.js');
const { getPhotoUrl, uploadPhotoToS3 } = require('../helpers/s3Handlers.js');
const randomImageName = require('../helpers/randomImageName.js');
const UserAccountModel = require('../models/userAccount.js');
const APIFeatures = require('../helpers/APIFeatures.js');

exports.getAllStudents = catchAsync(async (req, res, next) => {
  // const filterQueryObject = { ...req.query };
  // const excludedKeys = ['sort', 'page', 'limit'];
  // excludedKeys.forEach((el) => delete filterQueryObject[el]);

  let studentsQuery = new APIFeatures(StudentModel.find(), req.query)
    .filter()
    .paginate();

  // const page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 10;
  // const skip = (page - 1) * limit;
  // studentsQuery = studentsQuery.skip(skip).limit(limit);

  const students = await studentsQuery.query;

  for (const student of students) {
    student.photoURL = await getPhotoUrl(s3, student.photoURL);
  }

  res.status(200).json({
    status: 'success',
    results: students.length,
    data: students,
  });
});

exports.getStudent = catchAsync(async (req, res, next) => {
  const student = await StudentModel.findOne(
    (req.params.studentId && { _id: req.params.studentId }) ||
      (req.params.userId && { userId: req.params.userId })
  )
    .populate('userId')
    .populate('cityId')
    .exec();

  student.photoURL = await getPhotoUrl(s3, student.photoURL);

  res.status(200).json({
    status: 'success',
    data: student,
  });
});

exports.getMe = (req, res, next) => {
  req.params.userId = req.user._id;
  next();
};

exports.updateMe = async (req, res, next) => {
  if (req.body.password) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword',
        400
      )
    );
  }

  // filter req.body
  const allowedFields = [
    'name',
    'surname',
    'cityId',
    'vehicleCategory',
    'phone',
    'dateOfBirth',
  ];
  Object.keys(req.body).forEach(
    (key) => !allowedFields.includes(key) && delete req.body[key]
  );

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const updatedStudent = await StudentModel.findOneAndUpdate(
      { userId: req.user._id },
      req.body,
      { new: true, runValidators: true, session }
    );

    const updatedUser = await UserAccountModel.findByIdAndUpdate(
      updatedStudent.userId,
      req.body,
      { new: true, runValidators: true, session }
    );

    await session.commitTransaction();

    res.status(200).json({
      status: 'success',
      data: { updatedStudent, updatedUser },
    });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};

exports.updatePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please, upload photo file', 404));
  }

  const student = await StudentModel.findOne({ userId: req.user._id }).select(
    'photoURL'
  );

  const photoName =
    student.photoURL === 'default-user.jpg'
      ? 'student-' + randomImageName()
      : student.photoURL;

  await uploadPhotoToS3(s3, req.file, photoName);

  if (student.photoURL != photoName) {
    student.photoURL = photoName;
    await student.save();
  }

  res.status(200).json({
    status: 'success',
    data: {
      student,
    },
  });
});
