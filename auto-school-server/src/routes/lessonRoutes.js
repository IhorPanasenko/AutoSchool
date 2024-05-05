const express = require('express');

const router = express.Router();

router.get('/');

// Student signs up (books) for a lesson
// PATCH lessons/:lessonId/signup

// Admin/Instructor cancels still available lesson
// PATCH lessons/:lessonId/cancel

// Student cancels his lesson
// PATCH lessons/:lessonId/cancelMyLesson

module.exports = router;
