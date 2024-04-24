const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userLoginSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userAccounts',
    unique: true,
    required: [true, 'User id is required'],
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
        return /^([\w-\.]+(\+\w+)?@([\w-]+\.)+[\w-]{2,4})$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  emailVerificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'failed'],
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

userLoginSchema.methods.verifyPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userLoginSchema.methods.passwordChangedAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000; // time in seconds
    return changedTimestamp > JWTTimestamp;
  }
  return false;
};

const UserLoginModel = mongoose.model('userLogins', userLoginSchema);

module.exports = UserLoginModel;
