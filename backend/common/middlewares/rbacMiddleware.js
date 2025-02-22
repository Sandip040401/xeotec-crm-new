const Role = require("../../modules/CRM/Permission/models/Role");
const User = require("../../modules/CRM/User/models/User");

const rbacMiddleware = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await User.findById(userId)
        .populate("roles")
        .populate("customPermissions.permissionId");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // ✅ 1. Admin users bypass all permissions
      if (user.userType === "admin") {
        return next();
      }

      // ✅ 2. Get user's roles & permissions
      const userRoles = user.roles || [];
      const rolePermissions = new Set();

      for (const role of userRoles) {
        const populatedRole = await Role.findById(role._id).populate(
          "permissions.permissionId"
        );
        if (populatedRole) {
          for (const permission of populatedRole.permissions) {
            if (permission.allowed) {
              rolePermissions.add(permission.permissionId.name);
            }
          }
        }
      }

      // ✅ 3. Check if user has a **custom permission override**
      const customPermission = user.customPermissions.find(
        (perm) => perm.permissionId.name === requiredPermission
      );

      if (customPermission) {
        if (customPermission.allowed) {
          return next(); // User explicitly has permission
        } else {
          return res
            .status(403)
            .json({ message: "Access Denied (Custom Override)" });
        }
      }

      // ✅ 4. Check if permission exists in roles
      if (rolePermissions.has(requiredPermission)) {
        return next();
      }

      return res.status(403).json({ message: "Access Denied" });
    } catch (error) {
      console.error("RBAC Middleware Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

module.exports = rbacMiddleware;
