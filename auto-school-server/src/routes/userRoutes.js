const express = require('express');
const userAccountModel = require('../models/userAccount.js');

const router = express.Router();

// for admin

router.post('/', async (req, res) => {
  try {
    const newUser = await userAccountModel.create(req.body);

    // TODO: userLogin.create(email, password);

    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: 'failure',
      message: err.message,
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await userAccountModel.find({});

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      status: 'failure',
      message: err.message,
    });
  }
});

router.get('/:user_id', async (req, res) => {
  try {
    const user = await userAccountModel.findById(req.params.user_id);

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: 'failure',
      message: err.message,
    });
  }
});

router.delete('/:user_id', async (req, res) => {
  try {
    const user = await userAccountModel.findById(req.params.user_id);

    if (!user) {
      const error = new Error('No document found with that ID');
      error.code = 404;
      throw error;
    }

    await userAccountModel.deleteOne({ _id: user._id });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(err.code || 500).json({
      status: 'failure',
      message: err.message,
    });
  }
});

module.exports = router;
