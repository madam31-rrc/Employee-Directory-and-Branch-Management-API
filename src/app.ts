import express from "express";
import morgan from "morgan";
import { getHelmetMiddleware } from "./config/helmetConfig";
import cors from "cors";
import { getCorsOptions } from "./config/corsConfig";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";
import setupSwagger from "./config/swagger";
import bodyParser from "body-parser";

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(getHelmetMiddleware());
app.use(cors(getCorsOptions()));

app.get("/health", (_req, res) => res.status(200).send("Server is healthy"));

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

setupSwagger(app);

export default app;
