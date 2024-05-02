const mongoose = require('mongoose');

const validateHourFormat = function (value) {
  return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value); // 8:00, 10:30
};

const validateFromToHours = function (value) {
  const fromHourTime = new Date(`1970-01-01T${this.fromHour}`);
  const toHourTime = new Date(`1970-01-01T${value}`);

  return fromHourTime < toHourTime;
};

const lessonShema = new mongoose.Schema({
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'instructors',
    required: [true, 'Instructor id is required'],
  },
  student: {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'students',
    },
    name: String,
    surname: String,
  },
  price: {
    type: Number,
    min: [0, 'Price can not be negative value'],
    default: 500,
  },
  date: Date,
  fromHour: {
    type: String,
    validate: {
      validator: validateHourFormat,
      message: (props) =>
        `${props.value} is not a valid fromHour format. Please use HH:MM format.`,
    },
  },
  toHour: {
    type: String,
    validate: [
      {
        validator: validateHourFormat,
        message: (props) =>
          `${props.value} is not a valid fromHour format. Please use HH:MM format.`,
      },
      {
        validator: validateFromToHours,
        message: 'toHour must be greater than fromHour',
      },
    ],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const LessonModel = mongoose.model('lessons', lessonShema);

module.exports = LessonModel;
