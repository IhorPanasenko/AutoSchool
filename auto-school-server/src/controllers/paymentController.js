const catchAsync = require('../helpers/catchAsync.js');
const AppError = require('../helpers/appError.js');
const PaymentModel = require('../models/payment.js');
const StudentModel = require('../models/student.js');

exports.getStudentPayments = catchAsync(async (req, res, next) => {
  const payments = await PaymentModel.find({
    studentId: req.params.studentId,
  }).sort('-timestamp');

  res.status(200).json({
    status: 'success',
    results: payments.length,
    data: { payments },
  });
});

exports.createPayment = catchAsync(async (req, res, next) => {
  const student = await StudentModel.findOne({ userId: req.user._id }).select(
    '_id'
  );

  await PaymentModel.create({
    ...req.body,
    timestamp: new Date(req.body.end_date),
    orderId: req.body.order_id,
    studentId: student._id,
  });

  res.status(200).json({
    status: 'success',
    message: 'Payment was added',
  });
});
