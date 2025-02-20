// user login (admin for crm)
// we will take users directly from landing page login form
// users will be all admin/employees etc.


const bcrypt = require("bcryptjs");
const User = require("../models/User");

// company-user
const createUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role,
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

//crm user
module.exports = {
  createUser,
  getUsers,
};
