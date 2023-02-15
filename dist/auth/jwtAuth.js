"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySellerToken = exports.generateSellerToken = exports.verifyUserToken = exports.generateUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const secretKey = process.env.PAYLOAD_SECRET;
if (!secretKey) {
    throw new Error('Missing required environment variable for User Authentication');
}
;
function generateUserToken(payload) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '10m' }, (error, token) => {
            if (error) {
                reject(error);
            }
            else
                resolve(token);
        });
    });
}
exports.generateUserToken = generateUserToken;
async function verifyUserToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({
            error: 'Unauthorized'
        });
    }
    try {
        const user = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(403).send({
            error: "Token expired! please login again."
        });
    }
}
exports.verifyUserToken = verifyUserToken;
function generateSellerToken(payload) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '10m' }, (error, token) => {
            if (error) {
                reject(error);
            }
            else
                resolve(token);
        });
    });
}
exports.generateSellerToken = generateSellerToken;
async function verifySellerToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({
            error: 'Unauthorized'
        });
    }
    try {
        const seller = jsonwebtoken_1.default.verify(token, secretKey);
        req.seller = seller;
        next();
    }
    catch (error) {
        return res.status(403).send({
            error: "Token expired! please login again."
        });
    }
}
exports.verifySellerToken = verifySellerToken;
