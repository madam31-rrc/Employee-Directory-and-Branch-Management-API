import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { generateSwaggerSpec } from "./swaggerOptions";

const setupSwagger = (app: Express) => {
  const spec = generateSwaggerSpec();
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));
};

export default setupSwagger;
