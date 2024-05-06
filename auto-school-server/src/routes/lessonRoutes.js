const express = require('express');
const { authenticateJWT } = require('../middlewares/authenticateJWT');
const { restrictTo } = require('../middlewares/restrictTo');
const lessonController = require('../controllers/lessonController.js');

const router = express.Router();

router.get(
  '/my',
  authenticateJWT,
  restrictTo('student'),
  lessonController.getMyLessons
);

router.patch(
  '/:lessonId/signup',
  authenticateJWT,
  restrictTo('student'),
  lessonController.signupForLesson
);

router.patch(
  '/:lessonId/cancel',
  authenticateJWT,
  restrictTo('admin', 'instructor'),
  lessonController.cancelLesson
);

router.patch(
  '/:lessonId/cancel-my-lesson',
  authenticateJWT,
  restrictTo('student'),
  lessonController.cancelMyLesson
);

module.exports = router;
