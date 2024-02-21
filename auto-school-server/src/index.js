require('dotenv').config();
require('./config/db.js');
const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes.js');
const authRouter = require('./routes/authRoutes.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'failure',
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
