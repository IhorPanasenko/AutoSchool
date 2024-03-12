const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  surname: {
    type: String,
    required: [true, 'Surname is required'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userAccounts',
    unique: true,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'instructors',
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cities',
  },
  requestStatus: {
    type: String,
    enum: ['unsubmitted', 'pending', 'validated', 'failed'],
    default: 'unsubmitted',
  },
  vehicleCategory: {
    type: String,
    enum: ['A', 'B', 'C', 'D'],
    default: 'B',
  },
  photoURL: String,
});

const StudentModel = mongoose.model('students', studentSchema);

module.exports = StudentModel;
