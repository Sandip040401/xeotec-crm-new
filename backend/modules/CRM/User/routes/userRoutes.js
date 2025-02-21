const express = require("express");
const {
  createUser,
  getUsers,
  assignRole,
  getUserPermissions,
} = require("../controllers/userController.js");

const userRouter = express.Router();

userRouter.post("/user/create", createUser);
userRouter.get("/user", getUsers);

userRouter.post("/user/assign-role", assignRole);
userRouter.get("/user/permissions", getUserPermissions);


module.exports = userRouter;