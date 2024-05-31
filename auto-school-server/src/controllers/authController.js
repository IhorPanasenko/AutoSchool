const crypto = require('crypto');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userLogin = require('../models/userLogin');
const userAccount = require('../models/userAccount.js');
const StudentModel = require('../models/student.js');
const catchAsync = require('../helpers/catchAsync.js');
const AppError = require('../helpers/appError.js');
const randomString = require('../helpers/randomString.js');
const Email = require('../helpers/sendEmail.js');
const {
  oauth2Client,
  generateGoogleAuthUrl,
  peopleApi,
} = require('../config/googleOauth2Client.js');

const signSaveTokens = (res, userId, role) => {
  const accessToken = jwt.sign(
    { userId, role },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
    }
  );
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
    }
  );

  const accessTokenCookieExpireDate = new Date(
    Date.now() + process.env.JWT_ACCESS_TOKEN_COOKIE_EXPIRES * 1000
  );

  res.cookie('access_token', accessToken, {
    expire: accessTokenCookieExpireDate,
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });

  res.cookie('refresh_token', refreshToken, {
    maxAge: process.env.JWT_REFRESH_TOKEN_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });

  return { accessToken, refreshToken, expire: accessTokenCookieExpireDate };
};

const sendVerificationEmailToken = async (req, userLogin, name) => {
  const token = randomString();
  const tokenLifespanMinutes = 10;
  const tokenExpires = new Date(Date.now() + tokenLifespanMinutes * 60 * 1000);

  userLogin.confirmationToken = token;
  userLogin.confirmationTokenExpires = tokenExpires;
  await userLogin.save();

  const url = `${process.env.WEB_BASE_URL_LOCAL}confirmEmail/${userLogin.userId}?token=${token}`;

  try {
    await new Email(name, userLogin.email, url).verifyEmail();
  } catch (err) {
    userLogin.confirmationToken = undefined;
    userLogin.confirmationTokenExpires = undefined;
    await userLogin.save();

    throw new AppError(
      'There was an error sending the verification email. Try again later!',
      500
    );
  }
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
      },
    });
  } catch (err) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

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

  let studentData;
  if (userAccountData.role === 'student') {
    studentData = await StudentModel.findOne({
      userId: userAccountData._id,
    }).select('instructorId');
  }

  res.status(200).json({
    status: 'success',
    data: {
      email: userLoginData.email,
      userData: userAccountData,
      ...(studentData && { instructor: studentData.instructorId || null }),
      tokenExpire: expire,
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
        {
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
        }
      );

      const accessTokenCookieExpireDate = new Date(
        Date.now() + process.env.JWT_ACCESS_TOKEN_COOKIE_EXPIRES * 1000
      );

      res.cookie('access_token', accessToken, {
        expire: accessTokenCookieExpireDate,
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });

      res.status(200).json({
        tokenExpire: accessTokenCookieExpireDate,
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

  const userLoginData = await userLogin
    .findOne({ userId: req.user._id })
    .select('refreshToken');

  userLoginData.refreshToken = null;
  userLoginData.save();

  res.sendStatus(204);
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  const userLoginData = await userLogin.findOne({ userId: req.params.userId });

  if (!userLoginData)
    return next(new AppError('There is no user with that id', 400));

  if (!req.query.token)
    return next(new AppError('Please, provide confirmation token', 400));

  if (new Date(userLoginData.confirmationTokenExpires) < new Date()) {
    await updateVerification(userLoginData, 'failed');
    return next(new AppError('The token has expired', 400));
  }

  if (userLoginData.confirmationToken !== req.query.token) {
    await updateVerification(userLoginData, 'failed');
    return next(new AppError('The token is invalid', 400));
  }

  await updateVerification(userLoginData, 'verified');

  res
    .status(200)
    .json({ message: 'Your email address was verified successfully' });
});

const updateVerification = async (userLoginData, status) => {
  userLoginData.emailVerificationStatus = status;
  userLoginData.confirmationToken = undefined;
  userLoginData.confirmationTokenExpires = undefined;
  await userLoginData.save();
};

exports.resendVerificationEmail = catchAsync(async (req, res, next) => {
  const userLoginData = await userLogin.findOne({ userId: req.user._id });
  await sendVerificationEmailToken(req, userLoginData, req.user.name);

  res.status(200).json({
    message: 'Verification email was resend. Please, check your email',
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const userLoginData = await userLogin.findOne({ email: req.body.email });
  if (!userLoginData)
    return next(new AppError('No user was found with that email', 400));

  const resetToken = userLoginData.createPasswordResetToken();
  await userLoginData.save();

  const resetURL = `${process.env.WEB_BASE_URL_LOCAL}resetPassword/${resetToken}`;
  try {
    await new Email('User', userLoginData.email, resetURL).resetPassword();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to your email',
    });
  } catch (err) {
    userLoginData.passwordResetToken = undefined;
    userLoginData.passwordResetExpires = undefined;
    await userLoginData.save();

    throw new AppError(
      'There was an error sending the verification email. Try again later!',
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const userLoginData = await userLogin.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!userLoginData)
    return next(new AppError('Token is invalid or has expired', 400));

  const userAccountData = await userAccount
    .findById(userLoginData.userId)
    .select('role');

  const { accessToken, refreshToken, expire } = signSaveTokens(
    res,
    userLoginData.userId,
    userAccountData.role
  );

  userLoginData.passwordHash = req.body.password;
  userLoginData.passwordResetToken = undefined;
  userLoginData.passwordResetExpires = undefined;
  userLoginData.refreshToken = refreshToken;

  try {
    await userLoginData.save();
  } catch (err) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    throw err;
  }

  res.status(200).json({
    status: 'success',
    message: 'Password reset successfully',
    data: {
      tokenExpire: expire,
    },
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const userLoginData = await userLogin.findOne({ userId: req.user._id });

  if (
    !(await userLoginData.verifyPassword(
      req.body.currentPassword,
      userLoginData.passwordHash
    ))
  )
    return next(new AppError('The password is wrong', 401));

  const { accessToken, refreshToken, expire } = signSaveTokens(
    res,
    req.user._id,
    req.user.role
  );

  userLoginData.passwordHash = req.body.newPassword;
  userLoginData.refreshToken = refreshToken;

  try {
    await userLoginData.save();
  } catch (err) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    throw err;
  }

  res.status(200).json({
    status: 'success',
    message: 'Password updated successfully',
    data: {
      tokenExpire: expire,
    },
  });
});

exports.loginWithGoogle = catchAsync(async (req, res, next) => {
  const url = generateGoogleAuthUrl(
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/userinfo.email'
  );
  res.redirect(url);
});

exports.getGoogleToken = catchAsync(async (req, res, next) => {
  const code = req.query.code;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const email = await getEmailFromGoogleToken(tokens);

  const user = await userLogin.findOneAndUpdate(
    { email },
    { googleRefreshToken: tokens.refresh_token }
  );

  if (!user) return next(new AppError('No user found with this email', 400));

  res.status(200).json({
    status: 'success',
    message: 'Successfully logged in with Google!',
    data: tokens,
  });
});

const getEmailFromGoogleToken = async (tokens) => {
  const idToken = tokens.id_token;
  const decodedToken = jwt.decode(idToken);
  console.log(decodedToken);
  return decodedToken.email;
};
