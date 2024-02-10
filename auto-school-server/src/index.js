require('dotenv').config();
require('./config/db.js');
const express = require('express');
const userRouter = require('./routes/userRoutes.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10kb' }));

app.use('/api/users', userRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'failure',
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
