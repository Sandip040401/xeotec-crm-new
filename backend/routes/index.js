
const express = require("express");
const usersRouter = require("../modules/SuperAdmin/routes/index.js");
const router = express.Router();

router.use("/landing", usersRouter);

module.exports = router;