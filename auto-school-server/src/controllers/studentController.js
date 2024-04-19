const StudentModel = require('../models/student.js');
const catchAsync = require('../helpers/catchAsync.js');
const AppError = require('../helpers/appError.js');
const s3 = require('../config/s3Bucket.js');
const { getPhotoUrl, uploadPhotoToS3 } = require('../helpers/s3Handlers.js');
const randomImageName = require('../helpers/randomImageName.js');

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