"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSellerByEmail = exports.checkPhoneNumber = exports.checkEmail = exports.createSeller = void 0;
const seller_1 = require("../models/seller");
async function createSeller(sellerDetails) {
    try {
        const seller = await seller_1.Seller.create(sellerDetails);
        return JSON.parse(JSON.stringify(seller));
    }
    catch (error) {
        throw new Error(`Error creating user: ${error}`);
    }
}
exports.createSeller = createSeller;
async function checkEmail(email) {
    try {
        const emailCheck = await seller_1.Seller.findOne({
            where: { email }
        });
        return emailCheck ? true : false;
    }
    catch (error) {
        throw new Error(`Error checking email: ${error}`);
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
        throw new Error(`Error checking phone_number: ${error}`);
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
        throw new Error(`Error getting user by email: ${error}`);
    }
}
exports.getSellerByEmail = getSellerByEmail;
