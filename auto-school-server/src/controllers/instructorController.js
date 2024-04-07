const mongoose = require('mongoose');
const CarModel = require('../models/car.js');
const InstructorModel = require('../models/instructor.js');
const UserAccountModel = require('../models/userAccount.js');
const UserLoginModel = require('../models/userLogin.js');

exports.getAllInstructors = async (req, res) => {
  try {
    const filterQueryObject = { ...req.query };
    const excludedKeys = ['sort', 'page', 'limit'];
    excludedKeys.forEach((el) => delete filterQueryObject[el]);

    const instructorsQuery = InstructorModel.find(filterQueryObject);

    const instructors = await instructorsQuery
      .populate('car')
      .populate('city')
      .exec();

    res.status(200).json({
      status: 'success',
      results: instructors.length,
      data: instructors,
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOneInstructor = async (req, res) => {
  try {
    const instructor = await InstructorModel.findById(req.params.instructorId)
      .populate('car')
      .populate('city')
      .exec();

    // TODO: Get instructor reviews

    res.status(200).json({
      status: 'success',
      data: instructor,
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

exports.createInstructor = async (req, res) => {
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
    res
      .status(500)
      .json({ error: 'Transaction failed with error: ' + error.message });
  } finally {
    session.endSession();
  }
};
