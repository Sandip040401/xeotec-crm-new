const Role = require("../models/Role");

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const { companyId, name, description, permissions } = req.body;

    // Check for duplicate role in the company
    const existingRole = await Role.findOne({ companyId, name });
    if (existingRole) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Role already exists in this company",
        });
    }

    const role = new Role({ companyId, name, description, permissions });
    await role.save();

    res.status(201).json({ success: true, data: role });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find()
    res.json({ success: true, count: roles.length, data: roles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single role by ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id).populate(
      "permissions.permissionId",
      "name"
    );
    if (!role) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }
    res.json({ success: true, data: role });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a role
exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!role) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }

    res.json({ success: true, data: role });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);

    if (!role) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }

    res.json({ success: true, message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Assign permissions to a role
exports.assignPermission = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;

    const role = await Role.findById(roleId);
    if (!role) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }

    const permission = role.permissions.find(
      (p) => p.permissionId.toString() === permissionId
    );
    if (permission) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Permission already assigned to this role",
        });
    }

    role.permissions.push({ permissionId });

    await role.save();

    res.json({ success: true, data: role });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove a permission from a role
exports.removePermission = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;

    const role = await Role.findById(roleId);
    if (!role) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }

    role.permissions = role.permissions.filter(
      (p) => p.permissionId.toString() !== permissionId
    );

    await role.save();

    res.json({ success: true, data: role });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
