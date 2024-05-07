const express = require('express');
const { validateSchema } = require('../middlewares/validateSchema.js');
const { signupSchema } = require('../helpers/validationSchemas.js');
const authController = require('../controllers/authController.js');
const { authenticateJWT } = require('../middlewares/authenticateJWT.js');
const lessonController = require('../controllers/lessonController.js');

const router = express.Router();

router.get('/google-auth-code', authController.getGoogleToken);
router.get('/google', authController.loginWithGoogle);

router.get('/verify/users/:userId', authController.verifyEmail);
router.patch(
  '/verify/resend',
  authenticateJWT,
  authController.resendVerificationEmail
);

router.post('/signup', validateSchema(signupSchema), authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authenticateJWT,
  authController.updatePassword
);

router.post('/token', authController.getAccessToken);

router.delete('/logout', authenticateJWT, authController.logout);

module.exports = router;
