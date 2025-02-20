const express = require("express");
const { login } = require("../controllers/superAdminAuthController");

const crmCustomerAuthRouter = express.Router();


crmCustomerAuthRouter.post("/login", login);

module.exports = crmCustomerAuthRouter;