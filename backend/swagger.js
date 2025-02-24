const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const authDocs = yaml.load("./modules/Auth/docs/auth.yaml");
const admin = yaml.load("./modules/CRM/User/docs/admin.yaml");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Xeotec CRM API",
      version: "1.0.0",
      description: "API Documentation for Xeotec CRM",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Local server",
      },
      {
        url: "https://crm-api.xeotec.in",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "authToken",
        },
      },
    },
    security: [{ bearerAuth: [] }, { cookieAuth: [] }],
    paths: {
      ...authDocs.paths,
      ...admin.paths
    },
  },
  apis: [],
};

const specs = swaggerJsdoc(options);
const customCss = `
  .swagger-ui .topbar { display: none }  /* Hide the Swagger header */
`;


module.exports = { specs, swaggerUi, customCss };
