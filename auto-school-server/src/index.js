require('dotenv').config();
require('./config/db.js');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AppError = require('./helpers/appError.js');
const globalErrorHandler = require('./controllers/errorController.js');
const userRouter = require('./routes/userRoutes.js');
const authRouter = require('./routes/authRoutes.js');
const cityRouter = require('./routes/cityRoutes.js');
const instructorRouter = require('./routes/instructorRoutes.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/cities/', cityRouter);
app.use('/api/instructors', instructorRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
