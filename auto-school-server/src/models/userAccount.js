const mongoose = require('mongoose');
const userLogin = require('./userLogin.js');
const userGoogleLogin = require('./userGoogleLogin.js');

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
      message: (props) =>
        `${props.value} is not a valid phone number. Please enter phone number in the right format: XXX-XXX-XXXX`,
    },
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student',
  },
  dateOfBirth: Date,
});

userAccountSchema.post('findOneAndDelete', async function (doc) {
  console.log('Deleting user login and google login data');
  try {
    await userLogin.findOneAndDelete({ userId: doc._id });
    await userGoogleLogin.findOneAndDelete({ userId: doc._id });
  } catch (err) {
    console.log(err);
  }
});

const UserAccountModel = mongoose.model('userAccounts', userAccountSchema);

module.exports = UserAccountModel;
