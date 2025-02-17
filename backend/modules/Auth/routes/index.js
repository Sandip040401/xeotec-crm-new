// index routes for users

const express = require("express");
const superAdminAuthRouter = require("./superAdminAuthRoutes");
const authRouter = express.Router();


authRouter.use("/superadmin", superAdminAuthRouter);

module.exports = authRouter;