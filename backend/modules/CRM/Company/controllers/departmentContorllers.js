const Company = require("../models/Company");
const Department = require("../models/Department");

const createDepartment = async (req, res) => {
  try {
    const { name, company, description } = req.body;

    // if (!company) {
    //   return res.status(404).json({
    //     success: false,
    //     error: "Company not found",
    //   });
    // }

    const department = await Department.create({
      name,
      company: "67b70814423934916b53f80d",
      description,
    });

    await Company.findByIdAndUpdate(company, {
      $push: { departments: department._id },
    });

    const newData = await Department.find()

    res.status(201).json({
      success: true,
      data: newData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json({
      success: true,
      data: departments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createDepartment,
  getDepartments,
};
