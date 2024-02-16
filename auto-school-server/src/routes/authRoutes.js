const express = require('express');
const userLogin = require('../models/userLogin');
const userAccount = require('../models/userAccount.js');

const router = express.Router();

// TODO: Validate req.body

router.post('/signup', async (req, res) => {
  try {
    const newUserAccount = await userAccount.create({
      name: req.body.name,
      surname: req.body.surname,
      phone: req.body.phone,
      role: req.body.role,
      dateOfBirth: req.body.dateOfBirth,
    });

    const newUserLogin = await userLogin.create({
      userId: newUserAccount._id,
      email: req.body.email,
      passwordHash: req.body.password,
    });

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
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Provide email and password' });
    }

    const user = await userLogin.findOne({ email });

    //TODO: verify password

    //TODO: sign jwt tokens

    //TODO: save refresh token in db
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
