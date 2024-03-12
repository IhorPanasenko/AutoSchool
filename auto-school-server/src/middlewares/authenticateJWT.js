const jwt = require('jsonwebtoken');
const UserAccount = require('../models/userAccount.js');
const UserLogin = require('../models/userLogin.js');

exports.authenticateJWT = (req, res, next) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res.status(401).json({ error: 'You are not logged in' });
  }

  jwt.verify(
    accessToken,
    process.env.JWT_ACCESS_TOKEN_SECRET,
    async (err, data) => {
      if (err) {
        return res.status(403).json({
          error: 'Access token is no longer valid',
        });
      }

      const currentUser = await UserAccount.findById(data.userId);

      if (!currentUser) {
        return res.status(400).json({ error: 'User doesn\'t exist' });
      }

      // TODO: Test
      const currentUserLoginData = await UserLogin.findOne({userId: data.userId});
      const passwordChanged = currentUserLoginData.passwordChangedAfter(data.iat);

      if (passwordChanged) {
        return res.status(401).json({ error: 'Password was changed. Please, log in again' });
      }

      req.user = currentUser;
      next();
    }
  );
};
