// routes for super admin

const express = require("express");
const {
  createCompany,
  getCompanies,
} = require("../controllers/companyManagementControllers");
const validate = require("../../../../common/middlewares/validate");
const companySchema = require("../validations/companySchema.js");
const verifyToken = require("../../../../common/middlewares/verifyToken.js");
const verifySuperAdmin = require("../../../../common/middlewares/verifySuperAdmin.js");
const companyRouter = express.Router();

// routes for company management
companyRouter.post(
  "/create",
  validate(companySchema),
  verifyToken,
  verifySuperAdmin,
  createCompany
);

companyRouter.get("/", verifyToken, verifySuperAdmin, getCompanies);

module.exports = companyRouter;
