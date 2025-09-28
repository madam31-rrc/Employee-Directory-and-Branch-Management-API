import express, { Express } from "express";

// Importing morgan
import morgan from "morgan";
import employeeRoutes from 
"./api/v1/routes/employeeRoutes"

const app: Express = express();

// Use morgan for HTTP request logging
app.use(morgan("combined"));
app.use(express.json());



app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy');
});

app.use("/api/v1/employees", employeeRoutes);

export default app;