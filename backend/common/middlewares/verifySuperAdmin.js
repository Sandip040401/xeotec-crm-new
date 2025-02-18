const verifySuperAdmin = (req, res, next) => {
  // Check if the user is a super admin
  if (req.user.role !== "superadmin") {
    return res.status(403).json({
      success: false,
      error: "You are not authorized to access this route",
    });
  }

  next();
};

module.exports = verifySuperAdmin;
