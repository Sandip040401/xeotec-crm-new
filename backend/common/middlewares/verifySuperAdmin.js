const verifySuperAdmin = (req, res, next) => {
  // Check if the user is a super admin
  if (req.user.userType !== "superadmin") {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  next();
};

module.exports = verifySuperAdmin;
