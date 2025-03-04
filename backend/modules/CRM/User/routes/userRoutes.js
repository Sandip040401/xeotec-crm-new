const express = require("express");
const {
  createUser,
  getUsers,
  assignRole,
  getUserPermissions,
} = require("../controllers/userController.js");
const verifyToken = require("../../../../common/middlewares/verifyToken.js");
const rbacMiddleware = require("../../../../common/middlewares/rbacMiddleware.js");
const validate = require("../../../../common/middlewares/validate.js");
const userSchema = require("../validations/userValidations.js");

const userRouter = express.Router();

userRouter.post(
  "/user/create",
  verifyToken,
  rbacMiddleware("hr:user:create"),
  validate(userSchema),
  createUser
);
userRouter.get("/user", verifyToken, rbacMiddleware("hr:user:view"), getUsers);

userRouter.post("/user/assign-role",
  verifyToken,
  rbacMiddleware("hr:user:assign-role"),
  assignRole);
userRouter.get("/user/permissions",verifyToken, getUserPermissions);

module.exports = userRouter;
