// user login (admin for crm)
// we will take users directly from landing page login form
// users will be all admin/employees etc.

const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Company = require("../../Company/models/Company");
const Permission = require("../../Permission/models/Permission");
const Role = require("../../Permission/models/Role");
const generatePassword = require("../../../../common/utils/passwordGenerator");
const SuperAdmin = require("../../../SuperAdmin/models/SuperAdmin");
const userGenerationTemplates = require("../../Email/userGenerationTemplates");
const sendMail = require("../../Email/emailService");
const Department = require("../../Company/models/Department");

const checkUserExists = async (email, companyId) => {
  try {
    const [userA, userB] = await Promise.all([
      User.findOne({ email, companyId }),
      SuperAdmin.findOne({ email, companyId }),
    ]);

    return userA || userB ? true : false;
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
};

// company-user
const createUser = async (req, res) => {
  try {
    const { email, name, departmentId } = req.body;
    const companyId = req.user.companyId;

    const existingUser = await checkUserExists(email, companyId);

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "User existing for Company" });
    }

    const password = generatePassword(8);

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      email,
      password: hashedPassword,
      name,
      companyId,
    });

    user.departments.push(departmentId);

    const company = await Company.findById(companyId);
    const department = await Department.findById(departmentId);

    department.employees.push(user._id);
    company.employees.push(user._id);
    await company.save();
    await user.save();
    await department.save();

    const emailTemplate = userGenerationTemplates.userCreation(
      user.name,
      user.email,
      password
    );

    sendMail({
      to: user.email,
      subject: "User Account Created",
      templateData: emailTemplate,
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({
      companyId: req.user.companyId,
    })
      .populate("departments") // Populating Departments
      .populate("manager", "name email") // Populating Manager (Selecting only name & email)
      .populate("roles") // Populating Roles
      .populate("customPermissions.permissionId") // Populating customPermissions.permissionId
      .populate("companyId"); // Populating Company

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const assignRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findById(userId);

    user.roles.push(roleId);
    await user.save();

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const assignDepartment = async (req, res) => {
  try {
    const { userId, departmentId } = req.body;
    const user = await User.findById(userId).populate("departments");

    user.departments.push(departmentId);
    await user.save();

    res.json({
      success: true,
      message: "Department assigned successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const revokeRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findById(userId);

    user.roles = user.roles.filter((role) => role.toString() !== roleId);

    await user.save();

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const assignPermission = async (req, res) => {
  try {
    const { userId, permissionId } = req.body;
    const user = await User.findById(userId);

    user.customPermissions.push({ permissionId, allowed: true });
    await user.save();

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const revokePermission = async (req, res) => {
  try {
    const { userId, permissionId } = req.body;
    const user = await User.findById(userId);

    user.customPermissions = user.customPermissions.filter(
      (perm) => perm.permissionId.toString() !== permissionId
    );
    await user.save();

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const getUserPermissions = async (req, res) => {
  try {
    const userId = "67b8c87c0e5dc51df9bd96f1";

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId)
      .populate("roles")
      .populate("customPermissions.permissionId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let permissions = new Set();

    // ✅ 1. If user is an admin, grant all permissions
    if (user.userType === "admin") {
      const allPermissions = await Permission.find();
      allPermissions.forEach((perm) => permissions.add(perm.name));
      return res.json({ permissions: Array.from(permissions) });
    }

    // ✅ 2. Get permissions from user's roles
    for (const role of user.roles) {
      const populatedRole = await Role.findById(role._id).populate(
        "permissions.permissionId"
      );
      if (populatedRole) {
        for (const permission of populatedRole.permissions) {
          if (permission.allowed) {
            permissions.add(permission.permissionId.name);
          }
        }
      }
    }

    // ✅ 3. Apply custom user-specific permission overrides
    user.customPermissions.forEach((customPermission) => {
      if (customPermission.allowed) {
        permissions.add(customPermission.permissionId.name); // Explicitly allow
      } else {
        permissions.delete(customPermission.permissionId.name); // Explicitly deny
      }
    });

    res.json({
      success: true,
      permissions: Array.from(permissions),
    });
  } catch (error) {
    console.error("Error fetching user permissions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//crm user
module.exports = {
  createUser,
  getUsers,
  assignDepartment,
  assignRole,
  assignPermission,
  revokePermission,
  revokeRole,
  getUserPermissions,
};
