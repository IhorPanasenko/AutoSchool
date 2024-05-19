const joi = require('joi');

const signupSchema = joi.object({
  name: joi.string().required(),
  surname: joi.string().required(),
  phone: joi.string().regex(/\d{3}-\d{3}-\d{4}/),
  dateOfBirth: joi.date(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  cityId: joi.string(),
  vehicleCategory: joi.string().valid('A', 'B', 'C', 'D'),
});

const createInstructorSchema = signupSchema.append({
  model: joi.string().required(),
  year: joi.number().required().min(1980).max(new Date().getFullYear()),
  transmission: joi.string().valid('manual', 'automatic'),
  workExperience: joi.number().required(),
  maxNumOfStudents: joi.number().required(),
});

module.exports = {
  signupSchema,
  createInstructorSchema,
};
