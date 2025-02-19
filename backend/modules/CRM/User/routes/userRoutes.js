const express = require("express");
const { createUser, getUsers } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/user/create", createUser);
userRouter.get("/user", getUsers);


module.exports = userRouter;