const mongoose = require('mongoose');
const InstructorModel = require('./instructor');

const defaultDrivingSkillsData = [
  {
    typeEN: 'Preparation for movement',
    subtypeEN: 'Start from the spot',
    typeUA: 'Підготовка до руху',
    subtypeUA: 'Старт з місця',
  },
  {
    typeEN: 'Preparation for movement',
    subtypeEN: 'Smooth stop',
    typeUA: 'Підготовка до руху',
    subtypeUA: 'Плавна зупинка',
  },
  {
    typeEN: 'Preparation for movement',
    subtypeEN: 'Shifting gears',
    typeUA: 'Підготовка до руху',
    subtypeUA: 'Переключення передач',
  },
  {
    typeEN: 'Snake. Crazy eight',
    subtypeEN: 'Forwards',
    typeUA: 'Змійка. Віражна вісімка',
    subtypeUA: 'Передом',
  },
  {
    typeEN: 'Snake. Crazy eight',
    subtypeEN: 'Backwards',
    typeUA: 'Змійка. Віражна вісімка',
    subtypeUA: 'Задом',
  },
  {
    typeEN: 'Garage. Arrival from any trajectory',
    subtypeEN: 'Forwards',
    typeUA: 'Гараж. Заїзд з будь-якої траєкторії',
    subtypeUA: 'Передом',
  },
  {
    typeEN: 'Garage. Arrival from any trajectory',
    subtypeEN: 'Backwards',
    typeUA: 'Гараж. Заїзд з будь-якої траєкторії',
    subtypeUA: 'Задом',
  },
  {
    typeEN: 'Parking parallel to the curb',
    subtypeEN: 'Forwards',
    typeUA: 'Паркування паралельно бордюру',
    subtypeUA: 'Передом',
  },
  {
    typeEN: 'Parking parallel to the curb',
    subtypeEN: 'Backwards',
    typeUA: 'Паркування паралельно бордюру',
    subtypeUA: 'Задом',
  },
  {
    typeEN: 'Dimensions in the dimensional tunnel',
    subtypeEN: 'Left',
    typeUA: 'Габарити в габаритному тунелі',
    subtypeUA: 'Ліве',
  },
  {
    typeEN: 'Dimensions in the dimensional tunnel',
    subtypeEN: 'Right',
    typeUA: 'Габарити в габаритному тунелі',
    subtypeUA: 'Праве',
  },
  {
    typeEN: 'U-turn in limited space',
    subtypeEN: '-',
    typeUA: 'Розворот в обмеженому просторі',
    subtypeUA: '-',
  },
  {
    typeEN: 'Trestle',
    subtypeEN: 'With handbrake',
    typeUA: 'Естакада',
    subtypeUA: 'З ручником',
  },
  {
    typeEN: 'Trestle',
    subtypeEN: 'Without handbrake',
    typeUA: 'Естакада',
    subtypeUA: 'Без ручника',
  },
];

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    surname: {
      type: String,
      required: [true, 'Surname is required'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userAccounts',
      unique: true,
      required: [true, 'User id is required'],
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'instructors',
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cities',
    },
    requestStatus: {
      type: String,
      enum: ['unsubmitted', 'pending', 'validated', 'failed'],
      default: 'unsubmitted',
    },
    requestApprovedDate: Date,
    vehicleCategory: {
      type: String,
      enum: ['A', 'B', 'C', 'D'],
      default: 'B',
    },
    photoURL: {
      type: String,
      default: 'default-user.jpg',
    },
    active: {
      type: Boolean,
      default: false,
    },
    drivingSkills: {
      type: [
        {
          date: Date,
          completed: {
            type: Boolean,
            default: false,
          },
          typeEN: String,
          subtypeEN: String,
          typeUA: String,
          subtypeUA: String,
        },
      ],
      default: defaultDrivingSkillsData,
    },
  },
  { toJSON: { virtuals: true } }
);

studentSchema.virtual('drivingSkillsProgress').get(function () {
  const completedSkills = this.drivingSkills.filter(
    (skill) => skill.completed
  ).length;
  const allSkills = this.drivingSkills.length;
  const progressInPercentages = (completedSkills / allSkills) * 100;
  return Math.round(progressInPercentages * 10) / 10;
});

studentSchema.pre('findOneAndUpdate', async function () {
  this._original = await this.model.findOne(this.getQuery());
});

studentSchema.post('findOneAndUpdate', async function (updatedStudent) {
  const originalStudent = this._original;

  if (
    originalStudent.requestStatus !== updatedStudent.requestStatus &&
    updatedStudent.requestStatus === 'validated'
  ) {
    await InstructorModel.findByIdAndUpdate(updatedStudent.instructorId, {
      $inc: { currentNumOfStudents: 1 },
    });
  }
});

const StudentModel = mongoose.model('students', studentSchema);

module.exports = StudentModel;
