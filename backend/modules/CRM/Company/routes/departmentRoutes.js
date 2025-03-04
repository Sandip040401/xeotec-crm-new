// routes for super admin

const express = require("express");
const validate = require("../../../../common/middlewares/validate");
const {
  createDepartment,
  getDepartments,
  addUserToDepartment,
  addManagerToDepartment,
  removeUserFromDepartment,
} = require("../controllers/departmentContorllers");
const departmentSchema = require("../validations/departmentValidation");
const verifyToken = require("../../../../common/middlewares/verifyToken.js");
const rbacMiddleware = require("../../../../common/middlewares/rbacMiddleware.js");
const departmentRouter = express.Router();

// routes for department management
departmentRouter.post(
  "/department/create",
  verifyToken,
  rbacMiddleware("company:department:create"),
  validate(departmentSchema),
  createDepartment
);

departmentRouter.get(
  "/department",
  verifyToken,
  rbacMiddleware("company:department:view"),
  getDepartments
);

departmentRouter.post(
  "/department/add-user",
  verifyToken,
  rbacMiddleware("company:department:add-user"),
  addUserToDepartment
);

departmentRouter.delete(
  "/department/remove-user",
  verifyToken,
  rbacMiddleware("company:department:remove-user"),
  removeUserFromDepartment
);

departmentRouter.post(
  "/department/add-manager",
  verifyToken,
  rbacMiddleware("company:department:add-manager"),
  addManagerToDepartment
);

departmentRouter.delete(
  "/department/remove-manager",
  verifyToken,
  rbacMiddleware("company:department:remove-manager"),
  removeUserFromDepartment
);

module.exports = departmentRouter;
