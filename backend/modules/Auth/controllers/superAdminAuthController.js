// Login with OTP for Super Admin

const getMaskedEmail = require("../../../common/utils/maskEmail.js");
const sendMail = require("../../CRM/Email/emailService.js");
const emailTemplates = require("../../CRM/Email/emailTemplates.js");
const SuperAdmin = require("../../SuperAdmin/models/SuperAdmin.js");
const bcrypt = require("bcryptjs");

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

module.exports = {
  login,
};
