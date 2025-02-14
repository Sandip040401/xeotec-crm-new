const errorHandler = (err, req, res) => {
  console.error(err); // Log full error for debugging

  // Set default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle specific known errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Invalid data provided";
  }

  if (err.name === "UnauthorizedError") {
    statusCode = 401;
    message = "Unauthorized access";
  }

  // Response structure
  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack trace only in development
  });
};

module.exports = errorHandler;
