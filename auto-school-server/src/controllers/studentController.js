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
  const photoName = 'student-' + randomImageName();

  await uploadPhotoToS3(s3, req.file, photoName);

  const updatedStudent = await StudentModel.findOneAndUpdate(
    { userId: req.user._id },
    { photoURL: photoName },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedStudent,
    },
  });
});
