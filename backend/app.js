// src/app.js
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const expressRateLimit = require("express-rate-limit");
const errorHandler = require("./common/middlewares/errorHandler.js");
// const helmet = require("helmet");
const indexRoutes = require("./routes/index.js");
const connectDB = require("./common/config/db.js");
const { swaggerUi, specs, customCss } = require("./swagger.js");

// Load environment configuration
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Middleware
// app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend
    credentials: true, // Allow credentials (cookies, authentication headers)
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(
  expressRateLimit({
    windowMs: process.env.NODE_ENV === "production" ? 15 * 60 * 1000 : 0, // 15 minutes
    max: 100, // limit each IP to 100 requests
  })
);

// Mount routes
app.use("/api", indexRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    customCss,
    customSiteTitle: "Xeotec CRM API Docs",
  })
);

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

// Global error handler
app.use(errorHandler);

module.exports = app;
