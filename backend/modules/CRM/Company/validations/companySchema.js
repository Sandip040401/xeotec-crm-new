const Joi = require("joi");

// Validation Schema using Joi
const companySchema = Joi.object({
  name: Joi.string().required(),
  domain: Joi.string().uri().required(),
});

module.exports = companySchema;