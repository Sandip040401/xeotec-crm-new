const Joi = require("joi");

const permissionSchema = Joi.object({
  name: Joi.string()
    .required()
    .trim()
    .pattern(/^[a-zA-Z0-9-_]+:[a-zA-Z0-9-_]+:(view|edit|delete|create)$/)
    .messages({
      "string.empty": "Permission name is required",
      "string.pattern.base":
        "Permission name must be in the format '<module>:<resource>:<action>' where action is one of 'view', 'edit', 'delete', 'create'",
    }),
  module: Joi.string().required().trim().messages({
    "string.empty": "Module is required",
  }),
  resource: Joi.string().required().trim().messages({
    "string.empty": "Resource is required",
  }),
  action: Joi.string()
    .valid("view", "edit", "delete", "create")
    .required()
    .messages({
      "any.only": "Action must be one of 'view', 'edit', 'delete', 'create'",
    }),
  description: Joi.string().optional().allow(""),
});

module.exports = { permissionSchema };
