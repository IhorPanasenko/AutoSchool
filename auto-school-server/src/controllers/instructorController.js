const mongoose = require('mongoose');
const CarModel = require('../models/car.js');
const InstructorModel = require('../models/instructor.js');
const UserAccountModel = require('../models/userAccount.js');
const UserLoginModel = require('../models/userLogin.js');
const StudentModel = require('../models/student.js');
const catchAsync = require('../helpers/catchAsync.js');
const AppError = require('../helpers/appError.js');
const s3 = require('../config/s3Bucket.js');
const { getPhotoUrl, uploadPhotoToS3 } = require('../helpers/s3Handlers.js');
const randomImageName = require('../helpers/randomImageName.js');
const APIFeatures = require('../helpers/APIFeatures.js');
const Email = require('../helpers/sendEmail.js');

exports.getAllInstructors = catchAsync(async (req, res, next) => {
  let instructorsQuery = new APIFeatures(InstructorModel.find(), req.query)
    .filter()
    .sort()
    .paginate();

  const instructors = await instructorsQuery.query
    .populate('car')
    .populate('city')
    .exec();

  for (const instructor of instructors) {
    instructor.photoURL = await getPhotoUrl(s3, instructor.photoURL);
    instructor.car.photoURL = await getPhotoUrl(s3, instructor.car.photoURL);
  }

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

  // Get photo urls from s3 bucket

  instructor.photoURL = await getPhotoUrl(s3, instructor.photoURL);
  instructor.car.photoURL = await getPhotoUrl(s3, instructor.car.photoURL);

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

    await new Email(
      newUserAccount[0].name,
      newUserLogin[0].email
    ).sendInstructorPassword(req.body.password);

    // Upload photos to s3 bucket
    const instructorPhotoName = 'instructor-' + randomImageName();
    if (req.files.instructorPhoto) {
      await uploadPhotoToS3(
        s3,
        req.files.instructorPhoto[0],
        instructorPhotoName
      );
    }

    const carPhotoName = 'car-' + randomImageName();
    if (req.files.carPhoto) {
      await uploadPhotoToS3(s3, req.files.carPhoto[0], carPhotoName);
    }

    const newCar = await CarModel.create(
      [
        {
          model: req.body.model,
          year: req.body.year,
          transmission: req.body.transmission,
          photoURL: req.files.carPhoto && carPhotoName,
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
          photoURL: req.files.instructorPhoto && instructorPhotoName,
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

  if (req.body.name || req.body.surname) {
    await UserAccountModel.findByIdAndUpdate(updatedInstructor.userId, {
      name: req.body.name,
      surname: req.body.surname,
    });
  }

  if (req.file) {
    const photoName =
      updatedInstructor.photoURL === 'default-user.jpg'
        ? 'instructor-' + randomImageName()
        : updatedInstructor.photoURL;

    await uploadPhotoToS3(s3, req.file, photoName);

    updatedInstructor.photoURL = photoName;
    await updatedInstructor.save();
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
