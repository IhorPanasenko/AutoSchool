const jwt = require('jsonwebtoken');
const userLogin = require('../models/userLogin');
const userAccount = require('../models/userAccount.js');

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

  return { refreshToken, expire: accessTokenCookieExpireDate };
};

exports.signup = async (req, res) => {
  try {
    const newUserLogin = await userLogin.create({
      email: req.body.email,
      passwordHash: req.body.password,
    });

    const newUserAccount = await userAccount.create({
      name: req.body.name,
      surname: req.body.surname,
      phone: req.body.phone,
      role: req.body.role,
      dateOfBirth: req.body.dateOfBirth,
    });

    newUserLogin.userId = newUserAccount._id;

    // TODO: Email validation

    const { refreshToken, expire } = signSaveTokens(
      res,
      newUserAccount._id,
      newUserAccount.role
    );

    newUserLogin.refreshToken = refreshToken;
    newUserLogin.save();

    res.status(201).json({
      status: 'success',
      data: {
        email: newUserLogin.email,
        userData: newUserAccount,
        tokenExpire: expire,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
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

    const { refreshToken, expire } = signSaveTokens(
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
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAccessToken = async (req, res) => {
  // TODO
};
