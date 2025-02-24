const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userType: { type: String, default: "admin" },
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

module.exports = mongoose.model("AdminUser", adminUserSchema);
