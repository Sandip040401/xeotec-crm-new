const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    dob: { type: Date },
    address: { type: String },
    phone: { type: String },
    gender: { type: String },
    profilePicture: { type: String },
    departments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
    position: { type: String },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    joiningDate: { type: Date },
    terminationDate: { type: Date },
    employmentStatus: {
      type: String,
      enum: ["Active", "Terminated", "On Leave", "Retired"],
      default: "Active",
    },
    employmentType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Intern"],
      default: "Full-Time",
    },
    userType: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    customPermissions: [
      {
        permissionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Permission",
          required: true,
        },
        allowed: { type: Boolean, required: true },
      },
    ],
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    isActive: { type: Boolean, default: true }, // Enable/Disable User
    allowLogin: { type: Boolean, default: true }, // Allow/Disallow User to Login
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
