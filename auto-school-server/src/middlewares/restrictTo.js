const AppError = require('../helpers/appError.js');

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError('You have no permission to perform this action', 403)
      );
    next();
  };
};
