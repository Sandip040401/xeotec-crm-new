const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  departmentId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  isActive: Joi.boolean(),
  allowLogin: Joi.boolean(),
});

module.exports = userSchema;
