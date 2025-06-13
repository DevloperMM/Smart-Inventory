import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IT Inventory Management API",
      version: "1.0.0",
      description: "API documentation for the IT Inventory Management System",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    path.resolve("src/routes/**/*.js"),
    path.resolve("src/schema/**/*.js"),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
