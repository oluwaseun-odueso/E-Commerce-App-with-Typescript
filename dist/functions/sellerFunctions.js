"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSellerAccount = exports.updateSellerAccountDetails = exports.retrieveHashedPassword = exports.getSellerById = exports.getSellerByEmail = exports.checkPhoneNumber = exports.checkEmail = exports.createSeller = void 0;
const seller_1 = require("../models/seller");
async function createSeller(sellerDetails) {
    try {
        const seller = await seller_1.Seller.create(sellerDetails);
        return JSON.parse(JSON.stringify(seller));
    }
    catch (error) {
        throw new Error(`Error creating seller: ${error}`);
    }
    ;
}
exports.createSeller = createSeller;
;
async function checkEmail(email) {
    try {
        const emailCheck = await seller_1.Seller.findOne({
            where: { email }
        });
        return emailCheck ? true : false;
    }
    catch (error) {
        throw new Error(`Error checking if email exists: ${error}`);
    }
    ;
}
exports.checkEmail = checkEmail;
;
async function checkPhoneNumber(phone_number) {
    try {
        const phoneNumberCheck = await seller_1.Seller.findOne({
            where: { phone_number }
        });
        return phoneNumberCheck ? true : false;
    }
    catch (error) {
        throw new Error(`Error checking if phone_number exists: ${error}`);
    }
    ;
}
exports.checkPhoneNumber = checkPhoneNumber;
;
async function getSellerByEmail(email) {
    try {
        const seller = await seller_1.Seller.findOne({
            attributes: { exclude: ['hashed_password', 'image_key', 'createdAt', 'updatedAt'] },
            where: { email }
        });
        return JSON.parse(JSON.stringify(seller));
    }
    catch (error) {
        throw new Error(`Error getting seller by email: ${error}`);
    }
}
exports.getSellerByEmail = getSellerByEmail;
;
async function getSellerById(id) {
    try {
        const seller = await seller_1.Seller.findOne({
            attributes: { exclude: ['hashed_password', 'image_key', 'createdAt', 'updatedAt'] },
            where: { id }
        });
        return JSON.parse(JSON.stringify(seller));
    }
    catch (error) {
        throw new Error(`Error getting seller by id: ${error}`);
    }
}
exports.getSellerById = getSellerById;
async function retrieveHashedPassword(email) {
    try {
        const sellerPassword = await seller_1.Seller.findOne({
            attributes: ["hashed_password"],
            where: { email }
        });
        return JSON.parse(JSON.stringify(sellerPassword)).hashed_password;
    }
    catch (error) {
        throw new Error(`Error retrieving seller password: ${error}`);
    }
}
exports.retrieveHashedPassword = retrieveHashedPassword;
async function updateSellerAccountDetails(id, first_name, last_name, email, phone_number, address) {
    try {
        const updated = await seller_1.Seller.update({ first_name, last_name, email, phone_number, address }, {
            where: { id }
        });
        return updated;
    }
    catch (error) {
        throw new Error(`Error updating seller details: ${error}`);
    }
    ;
}
exports.updateSellerAccountDetails = updateSellerAccountDetails;
;
async function deleteSellerAccount(id) {
    try {
        const deletedAccount = await seller_1.Seller.destroy({
            where: { id }
        });
        return deletedAccount;
    }
    catch (error) {
        throw new Error(`Error deleting seller account: ${error}`);
    }
    ;
}
exports.deleteSellerAccount = deleteSellerAccount;
;
