const express = require("express");
const { login } = require("../controllers/superAdminAuthController");

const adminAuthRouter = express.Router();


adminAuthRouter.post("/login", login);

module.exports = adminAuthRouter;