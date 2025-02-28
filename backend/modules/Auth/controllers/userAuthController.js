const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../../CRM/Email/emailService");
const emailTemplates = require("../../CRM/Email/emailTemplates");
const getMaskedEmail = require("../../../common/utils/maskEmail");
const User = require("../../CRM/User/models/User");
const AdminUser = require("../../CRM/User/models/AdminUser");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = null;

    user = await User.findOne({
      email,
    });

    if (!user) {
      user = await AdminUser.findOne({
        email,
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }

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

    // set cookie
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

module.exports = {
  login,
};
