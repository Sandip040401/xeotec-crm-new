const express = require("express");
const { login } = require("../controllers/superAdminAuthController");

const userAuthRouter = express.Router();


userAuthRouter.post("/login", login);

module.exports = userAuthRouter;