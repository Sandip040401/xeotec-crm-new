const SuperAdmin = require("../models/SuperAdmin");
const bcrypt = require("bcryptjs");

const createSuperAdmin = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const superAdminExists = await SuperAdmin.findOne({ email });

    if (superAdminExists) {
      return res.status(400).json({
        success: false,
        error: "Super admin already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const superAdmin = await SuperAdmin.create({
      email,
      password: hashedPassword,
      name,
    });

    res.status(201).json({
      success: true,
      data: superAdmin,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const getSuperAdminProfile = async (req, res) => {
  try {
    const superAdmin = await SuperAdmin.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: superAdmin,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const updateSuperAdminProfile = async (req, res) => {
  try {
    const superAdmin = await SuperAdmin.findByIdAndUpdate(
      req.user.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: superAdmin,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createSuperAdmin,
  getSuperAdminProfile,
  updateSuperAdminProfile,
};
