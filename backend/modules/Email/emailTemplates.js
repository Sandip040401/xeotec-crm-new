const emailTemplates = {
  welcomeEmail: (name) => `
      <html>
        <body>
          <h2>Welcome, ${name}!</h2>
          <p>We are excited to have you on board.</p>
        </body>
      </html>
    `,

  passwordReset: (name, resetLink) => `
      <html>
        <body>
          <h2>Hello, ${name}</h2>
          <p>You requested a password reset. Click the link below:</p>
          <a href="${resetLink}">Reset Password</a>
        </body>
      </html>
    `,

  orderConfirmation: (name, orderId) => `
      <html>
        <body>
          <h2>Thank you for your order, ${name}!</h2>
          <p>Your order ID is <strong>${orderId}</strong>. We will notify you once it ships.</p>
        </body>
      </html>
    `,
  otpVerification: (name, otp) => `
      <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f8ff;
            padding: 20px;
        }
        .container {
            max-width: 500px;
            margin: 0 auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            border-top: 5px solid #007bff;
        }
        .logo {
            width: 100px;
            margin-bottom: 20px;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="container">
        
        <img src="https://media.licdn.com/dms/image/v2/D560BAQE50y9oYd9wPw/company-logo_200_200/company-logo_200_200/0/1727779349127?e=2147483647&v=beta&t=YaSHgq64ZE3vA10RiYdfmmthvprVKYarPnmkE37CF8E" alt="Logo" class="logo">
        <p>Hello ${name},</p>
        <p>Welcome! To ensure the safety and security of your account, we need to verify your account.</p>
        <p>Here's your One Time Password</p>
        <p class="otp">${otp}</p>
        <p>Please enter this OTP within 10 minutes of receiving this email.</p>
        <p>Thank you </p>
        <p><strong>XEOTEC E-SERVICES (P) LIMITED</strong></p>
    </div>
</body>
</html>
    `,
};

module.exports = emailTemplates;
