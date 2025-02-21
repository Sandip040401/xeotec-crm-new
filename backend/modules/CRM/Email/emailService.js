const { transporter } = require('../../../common/config/mailer.js');

const sendMail = async ({ to, cc, bcc, subject, templateData }) => {
  try {
    // If multiple recipients, make sure 'to' is an array, same for cc and bcc
    const toRecipients = Array.isArray(to) ? to.join(", ") : to;
    const ccRecipients = cc && Array.isArray(cc) ? cc.join(", ") : cc;
    const bccRecipients = bcc && Array.isArray(bcc) ? bcc.join(", ") : bcc;

    // Generate email content using the chosen template data
    const htmlContent = templateData;

    // Set up the email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toRecipients, // Comma separated list or a single address
      cc: ccRecipients, // Optional
      bcc: bccRecipients, // Optional
      subject,
      html: htmlContent,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true, info };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

module.exports = sendMail;
