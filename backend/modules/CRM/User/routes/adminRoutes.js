const express = require("express");
const AdminUserController = require("../controllers/AdminUserController");
const verifyToken = require("../../../../common/middlewares/verifyToken.js");
const verifySuperAdmin = require("../../../../common/middlewares/verifySuperAdmin.js");
const validate = require("../../../../common/middlewares/validate.js");
const adminUserSchema = require("../validations/adminUserValidations.js");
const adminRouter = express.Router();

// Route to create company admin
adminRouter.post(
  "/admin/create",
  verifyToken,
  verifySuperAdmin,
  validate(adminUserSchema),
  AdminUserController.createAdminUser
);

// Route to get all company admins
adminRouter.get(
  "/admin/",
  verifyToken,
  verifySuperAdmin,
  AdminUserController.getAdminUsers
);

// Route to get company admin by id
adminRouter.get(
  "/admin/:id",
  verifyToken,
  verifySuperAdmin,
  AdminUserController.getAdminUserById
);

// Route to update company admin
adminRouter.put(
  "/admin/:id",
  verifyToken,
  verifySuperAdmin,
  AdminUserController.updateAdminUser
);

// Route to delete company admin
adminRouter.delete(
  "/admin/:id",
  verifyToken,
  verifySuperAdmin,
  AdminUserController.deleteAdminUser
);

module.exports = adminRouter;
