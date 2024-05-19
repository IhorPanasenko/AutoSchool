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
    if (err.name === 'ValidationError') {
      // handle validation error from mongoose schema
      error = handleValidationMongooseError(error);
    }
    if (err.name === 'ValidationJoiSchemaError') {
      error = handleValidationJoiSchemaError(error);
    }

    productionError(error, res);
  } else {
    developmentError(err, res);
  }
};

const handleValidationMongooseError = (err) => {
  const errorMessages = Object.values(err.errors).map((err) => err.message);
  return new AppError(`Invalid input data. ${errorMessages.join('. ')}`, 400);
};

const handleValidationJoiSchemaError = (err) => {
  return new AppError(`Invalid input data. ${err.details[0].message}`, 400);
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
