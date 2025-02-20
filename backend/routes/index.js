
const express = require("express");
const authRouter = require("../modules/Auth/routes");
const comapanyRouter = require("../modules/CRM/Company/routes");
const router = express.Router();

// router.use("/users", usersRouter);

router.use("/auth", authRouter);
router.use("/company", comapanyRouter);


module.exports = router;