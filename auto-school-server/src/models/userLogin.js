const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userLoginSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userAccounts',
    unique: true,
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
  refreshToken: String,
});

userLoginSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();

  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);

  next();
});

const UserLoginModel = mongoose.model('userLogins', userLoginSchema);

module.exports = UserLoginModel;
