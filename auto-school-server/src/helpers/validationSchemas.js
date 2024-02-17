const joi = require('joi');

const signupSchema = joi.object({
  name: joi.string().required(),
  surname: joi.string().required(),
  phone: joi.string().regex(/\d{3}-\d{3}-\d{4}/),
  dateOfBirth: joi.date(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

module.exports = {
  signupSchema,
};
