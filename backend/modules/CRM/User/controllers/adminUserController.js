const AdminUser = require("../models/AdminUser");
const bcrypt = require("bcryptjs");
const generatePassword = require("../../../../common/utils/passwordGenerator");
const sendMail = require("../../Email/emailService");
const userGenerationTemplate = require("../../Email/userGenerationTemplates");
const Company = require("../../Company/models/Company");

exports.createAdminUser = async (req, res) => {
  try {
    const { name, email, companyId, isActive, allowLogin } = req.body;

    const existingUser = await AdminUser.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Check if company already has an admin as object id
    if (company.admin) {
      return res.status(400).json({ error: "Company already has an admin" });
    }

    const password = generatePassword(8);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new AdminUser({
      name,
      email,
      password: hashedPassword,
      companyId,
      isActive,
      allowLogin,
    });

    company.admin = newAdmin._id;

    await newAdmin.save();
    await company.save();

    const emailTemplate = userGenerationTemplate.adminCreation(
      newAdmin.name,
      newAdmin.email,
      password
    );

    sendMail({
      to: newAdmin.email,
      subject: "Admin Account Created",
      templateData: emailTemplate,
    });

    res
      .status(201)
      .json({ message: "Admin user created successfully", admin: newAdmin });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getAdminUsers = async (req, res) => {
  try {
    const admins = await AdminUser.find().populate("companyId", "name");
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admin users" });
  }
};

exports.getAdminUserById = async (req, res) => {
  try {
    const admin = await AdminUser.findById(req.params.id).populate(
      "companyId",
      "name"
    );
    if (!admin) return res.status(404).json({ error: "Admin user not found" });

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: "Error fetching admin user" });
  }
};

exports.updateAdminUser = async (req, res) => {
  try {
    const { error } = update.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, email, password, companyId, isActive, allowLogin } = req.body;
    let updateFields = { name, email, companyId, isActive, allowLogin };

    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    const updatedAdmin = await AdminUser.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedAdmin)
      return res.status(404).json({ error: "Admin user not found" });

    res.status(200).json({
      message: "Admin user updated successfully",
      admin: updatedAdmin,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating admin user" });
  }
};

exports.deleteAdminUser = async (req, res) => {
  try {
    const admin = await AdminUser.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ error: "Admin user not found" });

    res.status(200).json({ message: "Admin user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting admin user" });
  }
};
