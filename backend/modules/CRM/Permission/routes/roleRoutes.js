const express = require("express");
const validate = require("../../../../common/middlewares/validate");
const { roleSchema } = require("../validations/roleValidations");
const roleController = require("../controllers/roleController");
const verifyToken = require("../../../../common/middlewares/verifyToken");
const rbacMiddleware = require("../../../../common/middlewares/rbacMiddleware");
const roleRouter = express.Router();

// CRUD routes with validation middleware
roleRouter.post(
  "/create",
  verifyToken,
  rbacMiddleware("permission:role:create"),
  validate(roleSchema),
  roleController.createRole
);
roleRouter.get(
  "/",
  verifyToken,
  rbacMiddleware("permission:role:view"),
  roleController.getRoles
);
roleRouter.get("/:id", roleController.getRoleById);
roleRouter.put("/:id", validate(roleSchema), roleController.updateRole);
roleRouter.delete(
  "/:id",
  verifyToken,
  rbacMiddleware("permission:role:view"),
  roleController.deleteRole
);
roleRouter.post(
  "/assign-permission",
  verifyToken,
  rbacMiddleware("permission:role:assign-permission"),
  roleController.assignPermission
);
roleRouter.post(
  "/remove-permission",
  verifyToken,
  rbacMiddleware("permission:role:remove-permission"),
  roleController.removePermission
);

module.exports = roleRouter;
