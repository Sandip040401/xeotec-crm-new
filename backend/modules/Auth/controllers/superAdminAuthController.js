// Login with OTP for Super Admin
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getMaskedEmail = require("../../../common/utils/maskEmail");
const sendMail = require("../../CRM/Email/emailService");
const emailTemplates = require("../../CRM/Email/emailTemplates");
const SuperAdmin = require("../../SuperAdmin/models/SuperAdmin");

const login = async (req, res) => {
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

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

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

    if (user.otp !== parseInt(otp)) {
      return res.status(400).json({
        success: false,
        error: "Invalid OTP",
      });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        error: "OTP expired",
      });
    }

    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    // Generate jwt token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        userType: user.userType,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      message: "Authentication successful",
      data: {
        user: {
          name: user.name,
          email: getMaskedEmail(user.email),
          userType: user.userType,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("authToken");

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = {
  login,
  verifyOtp,
  logout,
};
