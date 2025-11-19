import express from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

const app = express();

app.use(express.json());
app.use(morgan("combined"));

// health
app.get("/health", (_req, res) => res.status(200).send("Server is healthy"));

// API
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

// error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: any) => {
  console.error(err);
  const status = err?.status || 500;
  res.status(status).json({ error: err?.message ?? "Internal server error" });
});

export default app;
