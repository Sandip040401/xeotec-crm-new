// routes for super admin

const express = require("express");
const {
  createCompany,
  getCompanies,
} = require("../controllers/companyManagementControllers");
const validate = require("../../../../common/middlewares/validate");
const companySchema = require("../validations/companySchema.js");
const {
  createDepartment,
  getDepartments,
} = require("../controllers/departmentContorllers");
const departmentSchema = require("../validations/departmentValidation");
const companyRouter = express.Router();

// routes for company management
companyRouter.post("/create", validate(companySchema), createCompany);
companyRouter.get("/", getCompanies);

// routes for department management
companyRouter.post(
  "/department/create",
  validate(departmentSchema),
  createDepartment
);
companyRouter.get("/department", getDepartments);

module.exports = companyRouter;
