const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userAccounts',
    required: [true, 'fromUser id is required'],
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userAccounts',
    required: [true, 'toUser id is required'],
  },
  text: {
    type: String,
    required: [true, 'Content is required'],
  },
  timestamp: {
    type: Date,
    default: () => Date.now(),
  },
});

const ChatMessageModel = mongoose.model('chatMessages', chatMessageSchema);

module.exports = ChatMessageModel;
