// routes for super admin

const express = require("express");
const { getSuperAdminProfile, updateSuperAdminProfile, superAdminLogin, createSuperAdmin } = require("../controllers/superAdminControllers.js");
const superAdminRouter = express.Router();


superAdminRouter.post("/login", superAdminLogin);
superAdminRouter.post("/register", createSuperAdmin);
superAdminRouter.get("/superadmin/profile", getSuperAdminProfile);
superAdminRouter.put("/superadmin/profile", updateSuperAdminProfile);

module.exports = superAdminRouter;
