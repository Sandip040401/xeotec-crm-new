// models/Role.js
const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String },
  permissions: [
    {
      permissionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
        required: true,
      },
      allowed: { type: Boolean, default: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Role", RoleSchema);
