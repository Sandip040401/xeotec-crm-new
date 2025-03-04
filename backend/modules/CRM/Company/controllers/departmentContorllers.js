const User = require("../../User/models/User");
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
    const departments = await Department.find({ company: req.user.companyId })
      .populate({ path: "employees", select: "name email" })
      .populate({ path: "managers", select: "name email" });

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

const addUserToDepartment = async (req, res) => {
  try {
    const { departmentId, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({
        success: false,
        error: "Department not found",
      });
    }

    department.employees.push(userId);
    user.departments.push(departmentId);
    await department.save();
    await user.save();

    res.json({
      success: true,
      data: department,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const removeUserFromDepartment = async (req, res) => {
  try {
    const { departmentId, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({
        success: false,
        error: "Department not found",
      });
    }

    department.employees = department.employees.filter(
      (employee) => employee.toString() !== userId
    );
    user.departments = user.departments.filter(
      (department) => department.toString() !== departmentId
    );
    await department.save();
    await user.save();

    res.json({
      success: true,
      data: department,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const addManagerToDepartment = async (req, res) => {
  try {
    const { departmentId, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({
        success: false,
        error: "Department not found",
      });
    }

    department.managers.push(userId);
    await department.save();

    res.json({
      success: true,
      data: department,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const removeManagerFromDepartment = async (req, res) => {
  try {
    const { departmentId, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({
        success: false,
        error: "Department not found",
      });
    }

    department.managers = department.managers.filter(
      (manager) => manager.toString() !== userId
    );
    await department.save();

    res.json({
      success: true,
      data: department,
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
  addUserToDepartment,
  addManagerToDepartment,
  removeUserFromDepartment,
  removeManagerFromDepartment,
};
