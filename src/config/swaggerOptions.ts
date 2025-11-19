import swaggerJsdoc from "swagger-jsdoc";

export const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Employee Directory and Branch Management API",
      version: "1.0.0",
      description: "API to manage employees and branches (PiXELL River sample)",
    },
    servers: [
      { url: process.env.SWAGGER_SERVER_URL || "http://localhost:3000/api/v1", description: "Local" },
    ],
  },
  apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validation/*.ts"],
};

export const generateSwaggerSpec = () => swaggerJsdoc(swaggerOptions);
