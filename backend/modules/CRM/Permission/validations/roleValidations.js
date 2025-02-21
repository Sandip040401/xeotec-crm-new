const Joi = require("joi");
const mongoose = require("mongoose");

const objectIdValidator = Joi.string()
  .custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.message("Invalid ObjectId format");
    }
    return value;
  }, "ObjectId validation");

const roleSchema = Joi.object({
  companyId: objectIdValidator.required().messages({
    "any.required": "Company ID is required",
  }),
  name: Joi.string().required().trim().messages({
    "string.empty": "Role name is required",
  }),
  description: Joi.string().optional().allow(""),
  permissions: Joi.array()
    .items(
      Joi.object({
        permissionId: objectIdValidator.required().messages({
          "any.required": "Permission ID is required",
        }),
        allowed: Joi.boolean().default(true),
      })
    )
    .optional(),
});

module.exports = { roleSchema };
