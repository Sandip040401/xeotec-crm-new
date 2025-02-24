const userGenerationTemplates = {
  adminCreation: (name, email, password) => `
      <html>
        <body>
          <h2>Welcome, ${name}!</h2>
          <p>Your account has been created with the following details:</p>
          <p>Email: <strong>${email}</strong></p>
          <p>Password: <strong>${password}</strong></p>
          <p>Please login to your account and change your password immediately.</p>
        </body>
      </html>
    `,
};

module.exports = userGenerationTemplates;
