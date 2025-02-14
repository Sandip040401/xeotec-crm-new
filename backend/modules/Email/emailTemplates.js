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
};

module.exports = emailTemplates;
