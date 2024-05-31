require('dotenv').config();
require('./config/db.js');
// require('./helpers/createSchedule.js');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AppError = require('./helpers/appError.js');
const globalErrorHandler = require('./controllers/errorController.js');
const userRouter = require('./routes/userRoutes.js');
const authRouter = require('./routes/authRoutes.js');
const cityRouter = require('./routes/cityRoutes.js');
const instructorRouter = require('./routes/instructorRoutes.js');
const studentRoutes = require('./routes/studentRoutes.js');
const lessonRoutes = require('./routes/lessonRoutes.js');
const reviewRoutes = require('./routes/reviewRoutes.js');
const carRoutes = require('./routes/carRoutes.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:3001',
      'http://127.0.0.1:5173',
      'http://localhost:5173',
    ],
    credentials: true,
  })
);

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/cities/', cityRouter);
app.use('/api/instructors', instructorRouter);
app.use('/api/students', studentRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/cars', carRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
