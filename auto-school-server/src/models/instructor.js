const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
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
  // add later default photo
  photoURL: {
    type: String,
    default:
      'https://i.ytimg.com/vi/2p16064inqc/hq720_2.jpg?sqp=-oaymwEiCNAFENAFSFryq4qpAxQIARUAAAAAJQAAyEI9AICiQ9ABAQ==&rs=AOn4CLD5CWwK4SPzBv3XvjsGzu6tiA9oEA',
  },
});

const InstructorModel = mongoose.model('instructors', instructorSchema);

module.exports = InstructorModel;
