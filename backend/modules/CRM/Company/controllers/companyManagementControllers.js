const Company = require("../models/Company");

// Create a new company
const createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json({ status: true,message: "Company created successfully", company });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all companies with pagination
const getCompanies = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const query = search ? { name: new RegExp(search, "i") } : {};
    const companies = await Company.find(query)
      .populate("admin", "name email")
      .populate("employees", "name email")
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Company.countDocuments(query);

    res.json({ total, page, companies });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single company by ID
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
      .populate("admin", "name email")
      .populate("employees", "name email");
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a company
const updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.json({ message: "Company updated successfully", company });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a company
const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.json({ message: "Company deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
