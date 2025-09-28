import express, { Express } from "express";

// Importing morgan
import morgan from "morgan";

const app: Express = express();

// Use morgan for HTTP request logging
app.use(morgan("combined"));
app.use(express.json());



app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy');
});

export default app;