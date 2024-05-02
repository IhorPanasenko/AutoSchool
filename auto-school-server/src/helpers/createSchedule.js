const schedule = require('node-schedule');
const InstructorModel = require('../models/instructor.js');
const LessonModel = require('../models/lesson.js');

const lessonHours = [
  {
    fromHour: '08:00',
    toHour: '09:00',
  },
  {
    fromHour: '09:00',
    toHour: '10:00',
  },
  {
    fromHour: '10:00',
    toHour: '11:00',
  },
  {
    fromHour: '11:00',
    toHour: '12:00',
  },
  {
    fromHour: '12:00',
    toHour: '13:00',
  },
  {
    fromHour: '14:00',
    toHour: '15:00',
  },
  {
    fromHour: '15:00',
    toHour: '16:00',
  },
  {
    fromHour: '17:00',
    toHour: '18:00',
  },
  {
    fromHour: '18:00',
    toHour: '19:00',
  },
];

const job = schedule.scheduleJob('0 2 * * 7', async function () {
  try {
    console.log('Creating schedule...');
    const instructors = await InstructorModel.find();

    const workingDays = 5;
    const week = 7 * 24 * 60 * 60 * 1000;
    const day = 24 * 60 * 60 * 1000;

    const today = new Date();
    const nextDayIn2Weeks = getDateIn(2 * week + day, today); // YYYY-MM-DD

    const promises = [];

    instructors.forEach(async (instructor) => {
      for (let i = 0; i < workingDays; i++) {
        for (let j = 0; j < lessonHours.length; j++) {
          promises.push(
            LessonModel.create({
              instructorId: instructor._id,
              date: getDateIn(i * day, nextDayIn2Weeks),
              fromHour: lessonHours[j].fromHour,
              toHour: lessonHours[j].toHour,
            })
          );
        }
      }
    });

    await Promise.all(promises);
    console.log('Schedule was created successfully');
  } catch (err) {
    console.error('An error occurred:', err);
  }
});

function getDateIn(timeInMs, startDate) {
  return new Date(new Date(startDate).getTime() + timeInMs)
    .toISOString()
    .split('T')[0];
}
