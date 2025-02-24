const express = require("express");
const { login, verifyOtp } = require("../controllers/superAdminAuthController");

const superAdminAuthRouter = express.Router();

superAdminAuthRouter.post("/login", login);
superAdminAuthRouter.post("/login/verify-otp", verifyOtp);

module.exports = superAdminAuthRouter;