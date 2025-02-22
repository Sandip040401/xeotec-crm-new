const express = require("express");
const permissionRouter = express.Router();
const permissionController = require("../controllers/permissionController");
const validate = require("../../../../common/middlewares/validate");
const { permissionSchema } = require("../validations/permissionValidations");

// CRUD routes with validation middleware
permissionRouter.post("/create", validate(permissionSchema), permissionController.createPermission);
permissionRouter.get("/", permissionController.getPermissions);
permissionRouter.get("/:id", permissionController.getPermissionById);
permissionRouter.put("/:id", validate(permissionSchema), permissionController.updatePermission);
permissionRouter.delete("/:id", permissionController.deletePermission);

module.exports = permissionRouter;
