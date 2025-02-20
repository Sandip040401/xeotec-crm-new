
const express = require("express");
const usersRouter = require("../modules/SuperAdmin/routes/index.js");
const authRouter = require("../modules/Auth/routes/index.js");
const router = express.Router();

router.use("/users", usersRouter);
router.use("/landing", usersRouter);
router.use("/auth", authRouter);


module.exports = router;