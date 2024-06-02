const express = require('express');
const chatController = require('../controllers/chatController.js');
const { authenticateJWT } = require('../middlewares/authenticateJWT.js');
const { restrictTo } = require('../middlewares/restrictTo.js');

const router = express.Router();

router.get(
  '/',
  authenticateJWT,
  restrictTo('instructor'),
  chatController.getMyChats
);

router.get(
  '/messages/:userId',
  authenticateJWT,
  chatController.getAllChatMessages
);

module.exports = router;
