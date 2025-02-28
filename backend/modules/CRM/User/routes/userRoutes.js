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
  validate(userSchema),
  verifyToken,
  rbacMiddleware("hr:user:create"),
  createUser
);
userRouter.get("/user", verifyToken, rbacMiddleware("hr:user:view"), getUsers);

userRouter.post("/user/assign-role", assignRole);
userRouter.get("/user/permissions", getUserPermissions);

module.exports = userRouter;
