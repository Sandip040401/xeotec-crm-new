// routes for super admin

const express = require("express");
const { getSuperAdminProfile, updateSuperAdminProfile } = require("../controllers/superAdminControllers");
const superAdminRouter = express.Router();

superAdminRouter.get("/superadmin/profile", getSuperAdminProfile);
superAdminRouter.put("/superadmin/profile", updateSuperAdminProfile);

module.exports = superAdminRouter;
