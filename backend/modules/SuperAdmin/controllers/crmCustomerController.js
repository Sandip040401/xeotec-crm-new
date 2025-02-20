const CrmCustomer = require("../models/crmCustomer.js");
const bcrypt = require("bcryptjs");

const createCrmCustomer = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const CrmCustomerExists = await CrmCustomer.findOne({ email });

    if (CrmCustomerExists) {
      return res.status(400).json({
        success: false,
        error: "Super admin already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const CrmCustomer = await CrmCustomer.create({
      email,
      password: hashedPassword,
      name,
    });

    res.status(201).json({
      success: true,
      data: CrmCustomer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const CrmCustomerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await CrmCustomer.findOne({
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

const getCrmCustomerProfile = async (req, res) => {
  try {
    const CrmCustomer = await CrmCustomer.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: CrmCustomer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const updateCrmCustomerProfile = async (req, res) => {
  try {
    const CrmCustomer = await CrmCustomer.findByIdAndUpdate(
      req.user.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: CrmCustomer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createCrmCustomer,
  getCrmCustomerProfile,
  updateCrmCustomerProfile,
  CrmCustomerLogin,
};
