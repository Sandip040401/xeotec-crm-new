const express = require("express");
const AdminUserController = require("../controllers/AdminUserController");
const verifyToken = require("../../../../common/middlewares/verifyToken.js");
const verifySuperAdmin = require("../../../../common/middlewares/verifySuperAdmin.js");
const validate = require("../../../../common/middlewares/validate.js");
const adminUserSchema = require("../validations/adminUserValidations.js");
const adminRouter = express.Router();

adminRouter.post(
  "/admin/create",
  // verifyToken,
  // verifySuperAdmin,
  validate(adminUserSchema),
  AdminUserController.createAdminUser
);
adminRouter.get("/admin/", AdminUserController.getAdminUsers);
adminRouter.get("/admin/:id", AdminUserController.getAdminUserById);
adminRouter.put("/admin/:id", AdminUserController.updateAdminUser);
adminRouter.delete("/admin/:id", AdminUserController.deleteAdminUser);

module.exports = adminRouter;
