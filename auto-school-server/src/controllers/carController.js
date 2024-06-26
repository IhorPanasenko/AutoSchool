const AppError = require('../helpers/appError.js');
const catchAsync = require('../helpers/catchAsync.js');
const CarModel = require('../models/car.js');
const StudentModel = require('../models/student.js');
const s3 = require('../config/s3Bucket.js');
const { getPhotoUrl, uploadPhotoToS3 } = require('../helpers/s3Handlers.js');
const randomString = require('../helpers/randomString.js');

exports.getAllCars = catchAsync(async (req, res, next) => {
  const cars = await CarModel.find({}).select('-ratings');

  for (const car of cars) {
    car.photoURL = await getPhotoUrl(s3, car.photoURL);
  }

  res.status(200).json({
    status: 'success',
    results: cars.length,
    data: cars,
  });
});

exports.updateCar = catchAsync(async (req, res, next) => {
  const updatedCar = await CarModel.findByIdAndUpdate(
    req.params.carId,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedCar)
    return next(new AppError('There is no car with that id', 400));

  if (req.file) {
    const photoName =
      updatedCar.photoURL === 'default-car.jpg'
        ? 'car-' + randomString()
        : updatedCar.photoURL;

    await uploadPhotoToS3(s3, req.file, photoName);

    updatedCar.photoURL = photoName;
    await updatedCar.save();
  }

  res.status(200).json({
    status: 'success',
    data: updatedCar,
  });
});

exports.addRating = catchAsync(async (req, res, next) => {
  const student = await StudentModel.findOne({ userId: req.user._id }).select(
    '_id'
  );

  const newRating = { studentId: student._id, rating: req.body.rating };

  const car = await CarModel.findOne({
    _id: req.params.carId,
    'ratings.studentId': student._id,
  });

  if (car) return next(new AppError('Student can add rating only once', 400));

  const updatedCar = await CarModel.findByIdAndUpdate(
    req.params.carId,
    { $push: { ratings: newRating } },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    data: updatedCar,
  });
});
