const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userLogin = require('../models/userLogin');
const userAccount = require('../models/userAccount.js');
const StudentModel = require('../models/student.js');

const signSaveTokens = (res, userId, role) => {
  const accessToken = jwt.sign(
    { userId, role },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES }
  );
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES }
  );

  const accessTokenCookieExpireDate = new Date(
    Date.now() + process.env.JWT_ACCESS_TOKEN_COOKIE_EXPIRES * 1000
  );

  res.cookie('access_token', accessToken, {
    expire: accessTokenCookieExpireDate,
    httpOnly: true,
  });

  res.cookie('refresh_token', refreshToken, {
    maxAge: process.env.JWT_REFRESH_TOKEN_COOKIE_EXPIRES * 60 * 1000,
    httpOnly: true,
  });

  return { accessToken, refreshToken, expire: accessTokenCookieExpireDate };
};

exports.signup = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const newUserAccount = await userAccount.create(
      [
        {
          name: req.body.name,
          surname: req.body.surname,
          phone: req.body.phone,
          dateOfBirth: req.body.dateOfBirth,
        },
      ],
      { session }
    );

    const { accessToken, refreshToken, expire } = signSaveTokens(
      res,
      newUserAccount._id,
      newUserAccount.role
    );

    const newUserLogin = await userLogin.create(
      [
        {
          userId: newUserAccount[0]._id,
          email: req.body.email,
          passwordHash: req.body.password,
          refreshToken,
        },
      ],
      { session }
    );

    await StudentModel.create(
      [
        {
          name: req.body.name,
          surname: req.body.surname,
          userId: newUserAccount[0]._id,
          cityId: req.body.cityId,
          vehicleCategory: req.body.vehicleCategory,
        },
      ],
      { session }
    );

    // TODO: Email validation

    await session.commitTransaction();

    res.status(201).json({
      status: 'success',
      data: {
        email: newUserLogin.email,
        userData: newUserAccount,
        tokenExpire: expire,
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    await session.abortTransaction();
    res
      .status(500)
      .json({ error: 'Transaction failed with error: ' + err.message });
  } finally {
    session.endSession();
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Provide email and password' });
    }

    const userLoginData = await userLogin.findOne({ email });

    if (
      !userLoginData ||
      !(await userLoginData.verifyPassword(
        password,
        userLoginData.passwordHash
      ))
    ) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const userAccountData = await userAccount.findById(userLoginData.userId);

    const { accessToken, refreshToken, expire } = signSaveTokens(
      res,
      userAccountData._id,
      userAccountData.role
    );

    userLoginData.refreshToken = refreshToken;
    userLoginData.save();

    res.status(200).json({
      status: 'success',
      data: {
        email: userLoginData.email,
        userData: userAccountData,
        tokenExpire: expire,
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ error: 'You need refresh token to gain a new access token' });
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    async (err, data) => {
      if (err) {
        return res.status(403).json({
          error:
            'Refresh token is no longer valid. Login to have get new tokens',
        });
      }

      const userLoginData = await userLogin
        .find({ userId: data.userId })
        .select('refreshToken');

      if (userLoginData[0].refreshToken !== refreshToken) {
        return res
          .status(403)
          .json({ error: "Refresh tokens don\t match or it doesn't exist" });
      }

      const user = await userAccount.findById(data.userId);

      if (!user) {
        return res.status(400).json({ error: "User doesn't exist" });
      }

      const accessToken = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES }
      );

      const accessTokenCookieExpireDate = new Date(
        Date.now() + process.env.JWT_ACCESS_TOKEN_COOKIE_EXPIRES * 1000
      );

      res.cookie('access_token', accessToken, {
        expire: accessTokenCookieExpireDate,
        httpOnly: true,
      });

      res.status(200).json({
        tokenExpire: accessTokenCookieExpireDate,
        accessToken,
      });
    }
  );
};

exports.logout = async (req, res) => {
  res.cookie('access_token', '', {
    maxAge: 0,
  });

  res.cookie('refresh_token', '', {
    maxAge: 0,
  });

  // TODO: change req.body.userId tp req.user.userId after adding auth middleware
  const userLoginData = await userLogin
    .findOne({ userId: req.body.userId })
    .select('refreshToken');

  userLoginData.refreshToken = null;
  userLoginData.save();

  res.sendStatus(204);
};
