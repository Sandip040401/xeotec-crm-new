const express = require("express");
const { login } = require("../controllers/userAuthController");

const userAuthRouter = express.Router();

userAuthRouter.post("/login", login);

module.exports = userAuthRouter;
