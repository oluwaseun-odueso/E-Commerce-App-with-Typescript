"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.checkPhoneNumber = exports.checkEmail = exports.hashUserPassword = exports.createUser = void 0;
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
exports.createUser = createUser;
async function hashUserPassword(password) {
    try {
        const saltRounds = 10;
        const hash = await bcrypt_1.default.hash(password, saltRounds);
        return hash;
    }
    catch (error) {
        throw new Error(`Error generating password hash: ${error}`);
    }
}
exports.hashUserPassword = hashUserPassword;
async function checkEmail(email) {
    try {
        const emailCheck = await user_1.User.findOne({
            where: { email }
        });
        return emailCheck ? true : false;
    }
    catch (error) {
        throw new Error(`Error checking email: ${error}`);
    }
}
exports.checkEmail = checkEmail;
async function checkPhoneNumber(phone_number) {
    try {
        const phoneNumberCheck = await user_1.User.findOne({
            where: { phone_number }
        });
        return phoneNumberCheck ? true : false;
    }
    catch (error) {
        throw new Error(`Error checking phone_number: ${error}`);
    }
}
exports.checkPhoneNumber = checkPhoneNumber;
async function getUserByEmail(email) {
    try {
        const result = await user_1.User.findOne({
            attributes: { exclude: ['password', 'image_key'] },
            where: { email }
        });
        return result;
    }
    catch (error) {
        throw new Error(`Error getting user by email: ${error}`);
    }
}
exports.getUserByEmail = getUserByEmail;
