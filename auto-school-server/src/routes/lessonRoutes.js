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

// Admin/Instructor cancels still available lesson
// PATCH lessons/:lessonId/cancel

// Student cancels his lesson
// PATCH lessons/:lessonId/cancelMyLesson

module.exports = router;
