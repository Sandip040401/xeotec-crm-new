const express = require("express");
const {
  login,
  verifyOtp,
  logout,
} = require("../controllers/superAdminAuthController");

const superAdminAuthRouter = express.Router();

superAdminAuthRouter.post("/login", login);
superAdminAuthRouter.post("/login/verify-otp", verifyOtp);
superAdminAuthRouter.post("/logout", logout);

module.exports = superAdminAuthRouter;