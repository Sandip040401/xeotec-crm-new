const Joi = require("joi");

// Validation Schema using Joi

const departmentSchema = Joi.object({
  name: Joi.string().required(),
  company: Joi.string().required(),
  managers: Joi.array().items(Joi.string()),
  employees: Joi.array().items(Joi.string()),
  description: Joi.string(),
});

module.exports = departmentSchema;
