/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  console.error(err); // Log full error for debugging

  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle Mongoose bad ObjectId (CastError)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ID format: ${err.value}`;
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // Handle duplicate key error (MongoDB unique constraint)
  if (err.code && err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  // Handle JWT authentication errors
  if (err.name === "UnauthorizedError") {
    statusCode = 401;
    message = "Unauthorized access";
  }

  // Handle forbidden access
  if (err.name === "ForbiddenError") {
    statusCode = 403;
    message = "You do not have permission to perform this action";
  }

  // Handle missing routes (404 Not Found)
  if (err.statusCode === 404 || err.message === "Not Found") {
    statusCode = 404;
    message = "Route not found";
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack only in dev mode
  });
};

module.exports = errorHandler;
