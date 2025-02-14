// src/app.js
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const errorHandler = require("./common/middlewares/errorHandler");
// const helmet = require("helmet");
const indexRoutes = require("./routes/index");
const connectDB = require("./common/config/db");

// Load environment configuration
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Middleware
// app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// Mount routes
app.use("/api", indexRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
