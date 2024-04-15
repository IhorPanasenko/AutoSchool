const crypto = require('crypto');
const mongoose = require('mongoose');
const CarModel = require('../models/car.js');
const InstructorModel = require('../models/instructor.js');
const UserAccountModel = require('../models/userAccount.js');
const UserLoginModel = require('../models/userLogin.js');
const StudentModel = require('../models/student.js');
const catchAsync = require('../helpers/catchAsync.js');
const AppError = require('../helpers/appError.js');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex');

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,
  },
  region: process.env.BUCKET_LOCATION,
});

exports.getAllInstructors = catchAsync(async (req, res, next) => {
  const filterQueryObject = { ...req.query };
  const excludedKeys = ['sort', 'page', 'limit'];
  excludedKeys.forEach((el) => delete filterQueryObject[el]);

  let instructorsQuery = InstructorModel.find(filterQueryObject);

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    instructorsQuery = instructorsQuery.sort(sortBy);
  }

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  instructorsQuery = instructorsQuery.skip(skip).limit(limit);

  const instructors = await instructorsQuery
    .populate('car')
    .populate('city')
    .exec();

  res.status(200).json({
    status: 'success',
    results: instructors.length,
    data: instructors,
  });
});

exports.getOneInstructor = catchAsync(async (req, res, next) => {
  const instructor = await InstructorModel.findById(req.params.instructorId)
    .populate('car')
    .populate('city')
    .exec();

  if (!instructor) {
    return next(new AppError('No instructor was found with such id', 404));
  }

  // TODO: Get instructor reviews

  res.status(200).json({
    status: 'success',
    data: instructor,
  });
});

exports.createInstructor = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const newUserAccount = await UserAccountModel.create(
      [
        {
          name: req.body.name,
          surname: req.body.surname,
          phone: req.body.phone,
          role: 'instructor',
          dateOfBirth: req.body.dateOfBirth,
        },
      ],
      { session }
    );

    const newUserLogin = await UserLoginModel.create(
      [
        {
          userId: newUserAccount[0]._id,
          email: req.body.email,
          passwordHash: req.body.password,
        },
      ],
      { session }
    );

    // TODO: Send email with master password ?
    // TODO: Upload photos to s3 bucket
    const s3Command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: randomImageName(),
      Body: req.files.instructorPhoto[0].buffer,
      ContentType: req.files.instructorPhoto[0].mimetype,
    });

    await s3.send(s3Command);

    const newCar = await CarModel.create(
      [
        {
          model: req.body.model,
          year: req.body.year,
          transmission: req.body.transmission,
          //photoURL: req.body.photoURL,
        },
      ],
      { session }
    );

    const newInstructor = await InstructorModel.create(
      [
        {
          userId: newUserAccount[0]._id,
          car: newCar[0]._id,
          city: req.body.cityId,
          name: req.body.name,
          surname: req.body.surname,
          vehicleCategory: req.body.vehicleCategory,
          workExperience: req.body.workExperience,
          maxNumOfStudents: req.body.maxNumOfStudents,
          //photoURL: req.body.photoURL,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    res.status(200).json({
      status: 'success',
      data: {
        email: newUserLogin.email,
        role: newUserAccount.role,
        instructor: newInstructor,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

exports.updateInstructor = catchAsync(async (req, res, next) => {
  const updatedInstructor = await InstructorModel.findByIdAndUpdate(
    req.params.instructorId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedInstructor) {
    return next(new AppError('No instructor was found with such id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: updatedInstructor,
  });
});

exports.deleteInstructor = catchAsync(async (req, res, next) => {
  const instructorId = req.params.instructorId;

  const hasActiveStudents = await StudentModel.exists({
    instructorId,
    active: 'true',
  });

  if (hasActiveStudents) {
    return res.status(403).json({
      error: 'Instructor has active students and cannot be deleted.',
    });
  }

  // TODO: Check if instructor has upcoming booked lessons

  const instructor = await InstructorModel.findByIdAndDelete(instructorId);

  if (!instructor) {
    return next(new AppError('No instructor was found with such id', 404));
  }

  res.status(204).send();
});
