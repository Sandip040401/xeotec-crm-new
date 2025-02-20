// index routes for users

const express = require("express");
const superAdminAuthRouter = require("./superAdminAuthRoutes.js");
const adminAuthRouter = require("./adminAuthRoutes.js");
const crmCustomerAuthRouter = require("./crmCustomerAuthRoutes.js");
const userAuthRouter = require("./userAuthRoutes.js");
const authRouter = express.Router();


authRouter.use("/superadmin", superAdminAuthRouter);
authRouter.use("/admin", adminAuthRouter);
authRouter.use("/crm-customer", crmCustomerAuthRouter);
authRouter.use("/user", userAuthRouter);

module.exports = authRouter;