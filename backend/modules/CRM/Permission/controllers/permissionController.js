const Permission = require("../models/Permission");

// Create a new permission
exports.createPermission = async (req, res) => {
  try {
    const { name, module, resource, action, description } = req.body;

    // Check for duplicate permission
    const existingPermission = await Permission.findOne({ name });
    if (existingPermission) {
      return res.status(400).json({ success: false, message: "Permission name already exists" });
    }

    const permission = new Permission({ name, module, resource, action, description });
    await permission.save();

    res.status(201).json({ success: true, data: permission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all permissions
exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json({ success: true, count: permissions.length, data: permissions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single permission by ID
exports.getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({ success: false, message: "Permission not found" });
    }
    res.json({ success: true, data: permission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a permission
exports.updatePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!permission) {
      return res.status(404).json({ success: false, message: "Permission not found" });
    }

    res.json({ success: true, data: permission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a permission
exports.deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);

    if (!permission) {
      return res.status(404).json({ success: false, message: "Permission not found" });
    }

    res.json({ success: true, message: "Permission deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
