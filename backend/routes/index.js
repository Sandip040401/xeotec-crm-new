
const express = require("express");
const authRouter = require("../modules/Auth/routes");
const superAdminRouter = require("../modules/SuperAdmin/routes/superAdminRoutes");
const userRouter = require("../modules/CRM/User/routes/userRoutes");
const companyRouter = require("../modules/CRM/Company/routes/companyRoutes");
const permissionRouter = require("../modules/CRM/Permission/routes/permissionRoutes");
const roleRouter = require("../modules/CRM/Permission/routes/roleRoutes");
const router = express.Router();

// router.use("/users", usersRouter);

router.use("/auth", authRouter);
router.use("/company", companyRouter);
router.use("/landing", superAdminRouter);
router.use("/users", userRouter);
router.use("/permission", permissionRouter);
router.use("/roles", roleRouter);

module.exports = router;