// index routes for users

const express = require("express");
const superAdminRouter = require("./superAdminRoutes");
const usersRouter = express.Router();


usersRouter.use("/superadmin", superAdminRouter);

module.exports = usersRouter;