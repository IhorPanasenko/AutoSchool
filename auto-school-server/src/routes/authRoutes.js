const express = require('express');
const userLogin = require('../models/userLogin');
const userAccount = require('../models/userAccount.js');
const { validateSchema } = require('../middlewares/validateSchema.js');
const { signupSchema } = require('../helpers/validationSchemas.js');
const authController = require('../controllers/authController.js');

const router = express.Router();

router.post('/signup', validateSchema(signupSchema), authController.signup);

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
