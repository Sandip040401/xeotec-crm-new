// crm customer user model

const mongoose = require("mongoose");

const CrmCustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "superadmin",
    },
    otp: {
      type: Number,
    },
    otpExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CrmCustomer", CrmCustomerSchema);
