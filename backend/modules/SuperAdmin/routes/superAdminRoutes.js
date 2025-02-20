// routes for super admin

const express = require("express");
const { getSuperAdminProfile, updateSuperAdminProfile, superAdminLogin, createSuperAdmin } = require("../controllers/superAdminControllers");
const superAdminRouter = express.Router();

superAdminRouter.get("/profile", getSuperAdminProfile);
superAdminRouter.put("/profile", updateSuperAdminProfile);
superAdminRouter.post("/login", superAdminLogin);
superAdminRouter.post("/register", createSuperAdmin);

module.exports = superAdminRouter;
