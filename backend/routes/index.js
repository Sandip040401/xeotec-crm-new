
const express = require("express");
const usersRouter = require("../modules/User/routes");
const authRouter = require("../modules/Auth/routes");
const router = express.Router();

router.use("/users", usersRouter);

router.use("/auth", authRouter);


module.exports = router;