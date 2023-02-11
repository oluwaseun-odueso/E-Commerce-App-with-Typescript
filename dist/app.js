"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes = require('./routes/user');
require('dotenv').config();
const port = process.env.PORT || 4000;
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.status(200).send('Official E-Commerce Page');
});
app.use(express_1.default.json());
app.use('/user', userRoutes);
app.listen(port, () => console.log("Server running"));
module.exports = app;
