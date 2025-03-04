const express = require("express");
const { login, logout } = require("../controllers/userAuthController");

const userAuthRouter = express.Router();


userAuthRouter.post("/login", login);
userAuthRouter.post("/logout", logout);


module.exports = userAuthRouter;
