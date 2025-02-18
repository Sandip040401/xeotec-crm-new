const express = require("express");
const { login } = require("../controllers/superAdminAuthController");

const superAdminAuthRouter = express.Router();



superAdminAuthRouter.post("/login", login);

module.exports = superAdminAuthRouter;