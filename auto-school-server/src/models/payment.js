const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students',
    required: true,
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lessons',
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paytype: String,
  timestamp: {
    type: Date,
    required: true,
  },
  provider: {
    type: String,
    default: 'LiqPay',
  },
  orderId: {
    type: String,
    required: true,
  },
});

const PaymentModel = mongoose.model('payments', paymentSchema);

module.exports = PaymentModel;
