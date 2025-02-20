// index routes for users

const express = require("express");
const comapanyManagementRouter = require("./companyManagementRoutes");
const comapanyRouter = express.Router();


comapanyRouter.use("/company-management", comapanyManagementRouter);

module.exports = comapanyRouter;