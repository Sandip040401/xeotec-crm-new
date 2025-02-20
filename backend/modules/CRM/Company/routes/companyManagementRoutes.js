// routes for super admin

const express = require("express");
const {
  createCompany,
  getCompanies,
} = require("../controllers/companyManagementControllers");
const validate = require("../../../../common/middlewares/validate");
const companySchema = require("../validations/companySchema");
const comapanyManagementRouter = express.Router();

comapanyManagementRouter.post(
  "/create",
  validate(companySchema),
  createCompany
);

comapanyManagementRouter.get("/", getCompanies);

module.exports = comapanyManagementRouter;
