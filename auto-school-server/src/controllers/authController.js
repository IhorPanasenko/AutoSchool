const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userLogin = require('../models/userLogin');
const userAccount = require('../models/userAccount.js');
const StudentModel = require('../models/student.js');
const catchAsync = require('../helpers/catchAsync.js');
const AppError = require('../helpers/appError.js');
const randomString = require('../helpers/randomString.js');
const Email = require('../helpers/sendEmail.js');

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

const sendVerificationEmailToken = async (req, userLogin, name) => {
  // Create token
  const token = randomString();
  const tokenLifespanMinutes = 10;
  const tokenExpires = new Date(Date.now() + tokenLifespanMinutes * 60 * 1000);

  // Save token to database
  userLogin.confirmationToken = token;
  userLogin.confirmationTokenExpires = tokenExpires;
  await userLogin.save();

  // Send email with url with token
  const url = `${req.protocol}://${req.get('host')}/api/auth/verify/user/${
    userLogin.userId
  }?token=${token}`;
  console.log(url);
  // new Email(name, userLogin.email, url);
};

exports.signup = async (req, res, next) => {
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

    // TODO: Email verification
    await sendVerificationEmailToken(
      req,
      newUserLogin[0],
      newUserAccount[0].name
    );

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
    next(err);
  } finally {
    session.endSession();
  }
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Provide email and password', 400));
  }

  const userLoginData = await userLogin.findOne({ email });

  if (
    !userLoginData ||
    !(await userLoginData.verifyPassword(password, userLoginData.passwordHash))
  ) {
    return next(new AppError('Incorrect email or password', 401));
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
});

exports.getAccessToken = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return next(
      new AppError('You need refresh token to gain a new access token', 401)
    );
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    async (err, data) => {
      if (err) {
        return next(
          new AppError(
            'Refresh token is no longer valid. Login to have get new tokens',
            403
          )
        );
      }

      const userLoginData = await userLogin
        .find({ userId: data.userId })
        .select('refreshToken');

      if (userLoginData[0].refreshToken !== refreshToken) {
        return next(
          new AppError("Refresh tokens don\t match or it doesn't exist", 403)
        );
      }

      const user = await userAccount.findById(data.userId);

      if (!user) {
        return next(new AppError("User doesn't exist", 400));
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
});

exports.logout = catchAsync(async (req, res, next) => {
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
});
