const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    managers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Department", departmentSchema);
