const mongoose = require('mongoose');
const CarModel = require('./car');
const UserAccountModel = require('./userAccount');
const s3 = require('../config/s3Bucket.js');
const { deletePhotoFromS3 } = require('../helpers/s3Handlers');
const StudentModel = require('./student.js');

const instructorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userAccounts',
      unique: true,
      required: [true, 'User id is required'],
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cars',
      required: [true, 'Car id is required'],
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cities',
      required: [true, 'City id is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    surname: {
      type: String,
      required: [true, 'Surname is required'],
    },
    vehicleCategory: {
      type: String,
      enum: ['A', 'B', 'C', 'D'],
      default: 'B',
    },
    workExperience: {
      type: Number,
      required: [true, 'Work experience is required'],
    },
    averageRating: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    maxNumOfStudents: {
      type: Number,
      required: [true, 'Maximum number of students is required'],
      default: 10,
    },
    currentNumOfStudents: {
      type: Number,
      default: 0,
    },
    photoURL: {
      type: String,
      default: 'default-user.jpg',
    },
  },
  { toJSON: { virtuals: true } }
);

instructorSchema.post('findOneAndDelete', async function (doc) {
  try {
    console.log('Deleting car and user account');
    await CarModel.findByIdAndDelete(doc.car);
    await UserAccountModel.findByIdAndDelete(doc.userId);

    console.log("Deleting instructor's photo from S3");
    doc.photoURL !== 'default-user.jpg' &&
      (await deletePhotoFromS3(s3, doc.photoURL));
  } catch (err) {
    console.log(err);
  }
});

instructorSchema.virtual('available').get(function () {
  return this.maxNumOfStudents > this.currentNumOfStudents;
});

instructorSchema.virtual('reviews', {
  ref: 'reviews',
  localField: '_id',
  foreignField: 'instructorId',
});

const InstructorModel = mongoose.model('instructors', instructorSchema);

module.exports = InstructorModel;
