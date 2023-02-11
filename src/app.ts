import express, { Application, Request, Response, NextFunction } from "express";
const userRoutes = require('./routes/user');
require('dotenv').config();

const port = process.env.PORT || 4000;
const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Official E-Commerce Page');
});

app.use(express.json())
app.use('/user', userRoutes);

app.listen(port, () => console.log("Server running"));

module.exports = app;

