const AppError = require('../helpers/appError.js');
const catchAsync = require('../helpers/catchAsync.js');
const s3 = require('../config/s3Bucket.js');
const { getPhotoUrl } = require('../helpers/s3Handlers.js');
const StudentModel = require('../models/student.js');
const InstructorModel = require('../models/instructor.js');
const ChatMessageModel = require('../models/chatMessage.js');

exports.getMyChats = catchAsync(async (req, res, next) => {
  const instructor = await InstructorModel.findOne({
    userId: req.user._id,
  }).select('_id');

  const students = await StudentModel.find({
    instructorId: instructor._id,
    requestStatus: 'validated',
  }).select('userId name surname photoURL');

  const studentsWithLastMessage = [];

  for (const student of students) {
    const studentObj = student.toObject();
    studentObj.photoURL = await getPhotoUrl(s3, student.photoURL);
    studentObj.lastMessage = await ChatMessageModel.findOne({
      $or: [
        { fromUser: student.userId, toUser: req.user._id },
        { fromUser: req.user._id, toUser: student.userId },
      ],
    }).sort('-timestamp');
    //console.log(studentObj.lastMessage);
    studentsWithLastMessage.push(studentObj);
  }

  //console.log(studentsWithLastMessage);

  res.status(200).json({
    status: 'success',
    data: {
      students: studentsWithLastMessage,
    },
  });
});
