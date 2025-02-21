const express = require("express");
const validate = require("../../../../common/middlewares/validate");
const { roleSchema } = require("../validations/roleValidations");
const roleController = require("../controllers/roleController");
const roleRouter = express.Router();


// CRUD routes with validation middleware
roleRouter.post("/create", validate(roleSchema), roleController.createRole);
roleRouter.get("/", roleController.getRoles);
roleRouter.get("/:id", roleController.getRoleById);
roleRouter.put("/:id", validate(roleSchema), roleController.updateRole);
roleRouter.delete("/:id", roleController.deleteRole);
roleRouter.post("/assign-permission", roleController.assignPermission);
roleRouter.post("/remove-permission", roleController.removePermission);


module.exports = roleRouter;
