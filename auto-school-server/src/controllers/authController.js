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

  res.cookie('access_token', accessToken, {
    maxAge: process.env.JWT_ACCESS_TOKEN_COOKIE_EXPIRES * 1000,
    httpOnly: true,
  });

  res.cookie('refresh_token', refreshToken, {
    maxAge: process.env.JWT_REFRESH_TOKEN_COOKIE_EXPIRES * 60 * 1000,
    httpOnly: true,
  });

  return refreshToken;
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

    const refreshToken = signSaveTokens(
      res,
      newUserAccount.userId,
      newUserAccount.role
    );

    newUserLogin.refreshToken = refreshToken;
    newUserLogin.save();

    res.status(201).json({
      status: 'success',
      data: {
        email: newUserLogin.email,
        userData: newUserAccount,
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

    const user = await userLogin.findOne({ email });

    if (!user || !(await user.verifyPassword(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    //TODO: sign jwt tokens

    //TODO: save refresh token in db

    res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
