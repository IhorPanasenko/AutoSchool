const mongoose = require('mongoose');

const userGoogleLoginSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userAccounts',
  },
  googleId: {
    type: String,
    required: [true, 'Provide google id'],
    unqie: true,
  },
  token: {
    type: String,
    required: [true, 'Provide google access token'],
  },
});

const UserGoogleLoginModel = mongoose.model(
  'userGoogleLogins',
  userGoogleLoginSchema
);

module.exports = UserGoogleLoginModel;
