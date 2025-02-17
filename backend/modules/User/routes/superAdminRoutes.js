// routes for super admin

const express = require("express");
const { getSuperAdminProfile, updateSuperAdminProfile } = require("../controllers/superAdminControllers");
const superAdminRouter = express.Router();

superAdminRouter.get("/profile", getSuperAdminProfile);
superAdminRouter.put("/profile", updateSuperAdminProfile);

module.exports = superAdminRouter;
