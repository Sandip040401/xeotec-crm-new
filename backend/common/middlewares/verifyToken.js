const jwt = require("jsonwebtoken");
const User = require("../models/user/user");
const SuperAdmin = require("../../modules/User/models/SuperAdmin");

const verifyToken = async (req, res, next) => {
  // Check for the token in the Authorization header
  const token =
    req.cookies.authToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    // Verify the token using the secret key from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user info to the request object

    // Find the user in the database using the decoded user ID

    if (decoded.role === "superadmin") {
      const user = await SuperAdmin.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      // Proceed to the next middleware or route handler
      next();
    } else {
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;

      // Proceed to the next middleware or route handler
      next();
    }
  } catch (err) {
    res.clearCookie("authToken");
    console.error("Token verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
