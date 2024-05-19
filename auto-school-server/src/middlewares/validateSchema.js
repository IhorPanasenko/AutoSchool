const joi = require('joi');

const validateSchema = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);

    if (result.error) {
      result.error.name = 'ValidationJoiSchemaError';
      next(result.error);
    }

    req.body = result.value;
    next();
  };
};

module.exports = {
  validateSchema,
};
