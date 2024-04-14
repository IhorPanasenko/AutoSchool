const AppError = require('./../helpers/appError.js');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err.name === 'CastError') {
      error = handleCastErrorMongoDB(error);
    }
    if (err.code === 11000) {
      error = handleDuplicateFieldMongoDB(error);
    }

    productionError(error, res);
  } else {
    developmentError(err, res);
  }
};

const handleCastErrorMongoDB = (err) => {
  return new AppError(`Incorrect ${err.path}: ${err.value}`, 400);
};

const handleDuplicateFieldMongoDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  return new AppError(
    `Duplicate field for ${field}: ${err.keyValue[field]}`,
    400
  );
};

const developmentError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const productionError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //console.error('ERROR OCCURED: ', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong.',
    });
  }
};
