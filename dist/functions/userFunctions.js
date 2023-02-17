"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserAccount = exports.updateUserAccountDetails = exports.confirmRetrievedPassword = exports.retrieveHashedPassword = exports.getUserById = exports.getUserByEmail = exports.checkIfEntriesMatch = exports.checkPhoneNumber = exports.checkEmail = exports.hashPassword = exports.createUser = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function createUser(userDetails) {
    try {
        const user = await user_1.User.create(userDetails);
        return JSON.parse(JSON.stringify(user));
    }
    catch (error) {
        throw new Error(`Error creating user: ${error}`);
    }
}
exports.createUser = createUser;
async function hashPassword(password) {
    try {
        const saltRounds = 10;
        const hash = await bcrypt_1.default.hash(password, saltRounds);
        return hash;
    }
    catch (error) {
        throw new Error(`Error generating password hash: ${error}`);
    }
}
exports.hashPassword = hashPassword;
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
    ;
}
exports.checkPhoneNumber = checkPhoneNumber;
;
function checkIfEntriesMatch(firstValue, secondValue) {
    return firstValue === secondValue;
}
exports.checkIfEntriesMatch = checkIfEntriesMatch;
async function getUserByEmail(email) {
    try {
        const user = await user_1.User.findOne({
            attributes: { exclude: ['hashed_password', 'image_key', 'createdAt', 'updatedAt'] },
            where: { email }
        });
        return JSON.parse(JSON.stringify(user));
    }
    catch (error) {
        throw new Error(`Error getting user by email: ${error}`);
    }
}
exports.getUserByEmail = getUserByEmail;
async function getUserById(id) {
    try {
        const user = await user_1.User.findOne({
            attributes: { exclude: ['hashed_password', 'image_key', 'createdAt', 'updatedAt'] },
            where: { id }
        });
        return JSON.parse(JSON.stringify(user));
    }
    catch (error) {
        throw new Error(`Error getting user by id: ${error}`);
    }
}
exports.getUserById = getUserById;
async function retrieveHashedPassword(email) {
    try {
        const userPassword = await user_1.User.findOne({
            attributes: ["hashed_password"],
            where: { email }
        });
        return JSON.parse(JSON.stringify(userPassword)).hashed_password;
    }
    catch (error) {
        throw new Error(`Error retrieving user password: ${error}`);
    }
}
exports.retrieveHashedPassword = retrieveHashedPassword;
async function confirmRetrievedPassword(password, hashedPassword) {
    try {
        const confirmPassword = await bcrypt_1.default.compare(password, hashedPassword);
        return confirmPassword;
    }
    catch (error) {
        throw new Error(`Error comfirming password: ${error}`);
    }
    ;
}
exports.confirmRetrievedPassword = confirmRetrievedPassword;
;
async function updateUserAccountDetails(id, first_name, last_name, email, phone_number, address, state, postal_code) {
    try {
        const updated = await user_1.User.update({ first_name, last_name, email, phone_number, address, state, postal_code }, {
            where: { id }
        });
        return updated;
    }
    catch (error) {
        throw new Error(`Error updating user details: ${error}`);
    }
}
exports.updateUserAccountDetails = updateUserAccountDetails;
;
async function deleteUserAccount(id) {
    try {
        const deletedAccount = await user_1.User.destroy({
            where: { id }
        });
        return deletedAccount;
    }
    catch (error) {
        throw new Error(`Error deleting user account: ${error}`);
    }
    ;
}
exports.deleteUserAccount = deleteUserAccount;
;
