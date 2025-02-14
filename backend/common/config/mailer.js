const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: "no-reply@xeotec.in",
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("Error configuring mail transporter:", error);
  } else {
    console.log("Mailer is ready to send emails");
  }
});

module.exports = transporter;
