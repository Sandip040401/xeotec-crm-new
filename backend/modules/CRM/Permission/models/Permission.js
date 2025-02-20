// models/Permission.js
const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true }, // e.g., "hr:user:view"
  module: { type: String, required: true },
  resource: { type: String, required: true },
  action: { type: String, required: true }, // e.g., "view", "edit", "delete", "create"
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Permission", PermissionSchema);
