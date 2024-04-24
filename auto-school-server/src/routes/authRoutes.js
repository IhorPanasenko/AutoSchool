const express = require('express');
const userLogin = require('../models/userLogin');
const userAccount = require('../models/userAccount.js');
const { validateSchema } = require('../middlewares/validateSchema.js');
const { signupSchema } = require('../helpers/validationSchemas.js');
const authController = require('../controllers/authController.js');
const { authenticateJWT } = require('../middlewares/authenticateJWT.js');

const router = express.Router();

router.get('/verify/users/:userId', authController.verifyEmail);

router.patch(
  '/verify/resend',
  authenticateJWT,
  authController.resendVerificationEmail
);

router.post('/signup', validateSchema(signupSchema), authController.signup);

router.post('/login', authController.login);

router.post('/token', authController.getAccessToken);

router.delete('/logout', authenticateJWT, authController.logout);

module.exports = router;
