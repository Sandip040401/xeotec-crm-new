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

const superAdminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await SuperAdmin.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // Generate OTP

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.otp = otp;

    user.otpExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    // Send OTP to user's email

    await sendMail({
      to: user.email,
      subject: `${user.name}, please verify your account`,
      templateData: emailTemplates.otpVerification(user.name, otp),
    });

    return res.status(200).json({
      success: true,
      mail: getMaskedEmail(user.email),
      message: "OTP sent to your email",
    });
  } catch (error) {
    res.status(500).json({
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
  superAdminLogin,
};
