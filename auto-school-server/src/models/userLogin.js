const mongoose = require('mongoose');

const userLoginSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userAccounts',
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        // Regular expression for email validation
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  emailValidationStatus: {
    type: String,
    enum: ['pending', 'validated', 'failed'],
    default: 'pending',
  },
  confirmationToken: String,
  confirmationTokenExpires: Date,
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
  },
  passwordChangedAt: Date,
  passwordRecoveryToken: String,
  passwordResetExpires: Date,
});

const UserLoginModel = mongoose.model('userLogins', userLoginSchema);

module.exports = UserLoginModel;
