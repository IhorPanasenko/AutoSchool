const mongoose = require('mongoose');

const userAccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  surname: {
    type: String,
    required: [true, 'Surname is required'],
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v); // Format: XXX-XXX-XXXX
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student',
  },
  dateOfBirth: Date,
});

const UserAccountModel = mongoose.model('userAccounts', userAccountSchema);

model.exports = UserAccountModel;
