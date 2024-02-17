const userLogin = require('../models/userLogin');
const userAccount = require('../models/userAccount.js');

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
    newUserLogin.save();

    res.status(201).json({
      status: 'success',
      data: {
        email: newUserLogin.email,
        userData: newUserAccount,
      },
    });

    // TODO: Email validation

    // TODO: Sign JWT tokens
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

    //TODO: verify password
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
