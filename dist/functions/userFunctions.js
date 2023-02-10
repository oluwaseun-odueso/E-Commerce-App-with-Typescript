"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function createUser(userDetails) {
    try {
        const user = await user_1.User.create(userDetails);
        return user;
    }
    catch (error) {
        throw new Error(`Error creating user: ${error}`);
        // return error
    }
}
async function hashUserPassword(password) {
    try {
        const saltRounds = 10;
        const hash = await bcrypt_1.default.hash(password, saltRounds);
        return hash;
    }
    catch (error) {
        throw new Error('Error generating password hash');
    }
}
