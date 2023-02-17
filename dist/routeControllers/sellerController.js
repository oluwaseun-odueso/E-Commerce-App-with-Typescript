"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSellerAccount = exports.updateSellerAccount = exports.loginSeller = exports.signUpSeller = void 0;
const userFunctions_1 = require("../functions/userFunctions");
const sellerFunctions_1 = require("../functions/sellerFunctions");
const jwtAuth_1 = require("../auth/jwtAuth");
async function signUpSeller(req, res) {
    try {
        if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.phone_number || !req.body.address || !req.body.password) {
            res.status(400).json({
                success: false,
                message: "Please enter all required fields"
            });
            return;
        }
        const { first_name, last_name, email, store_id, phone_number, address, image_key, password } = req.body;
        if (await (0, sellerFunctions_1.checkEmail)(email)) {
            res.status(400).send({ success: false, message: "Email already exists" });
            return;
        }
        if (await (0, sellerFunctions_1.checkPhoneNumber)(phone_number)) {
            res.status(400).send({ success: false, message: "Phone number already exists" });
            return;
        }
        const hashed_password = await (0, userFunctions_1.hashPassword)(password);
        const sellerDetails = { first_name, last_name, email, store_id, phone_number, address, image_key, hashed_password };
        await (0, sellerFunctions_1.createSeller)(sellerDetails);
        const seller = await (0, sellerFunctions_1.getSellerByEmail)(email);
        res.status(201).send({ success: true, message: "Your account has been created", seller });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error creating seller',
            error: error.message
        });
    }
}
exports.signUpSeller = signUpSeller;
async function loginSeller(req, res) {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({
                success: false,
                message: "Please enter email and password"
            });
            return;
        }
        const { email, password } = req.body;
        const seller = await (0, sellerFunctions_1.getSellerByEmail)(email);
        if (!seller) {
            res.status(400).send({ success: false, message: "The email you entered does not exist" });
            return;
        }
        ;
        const collectedUserPassword = await (0, sellerFunctions_1.retrieveHashedPassword)(email);
        if (await (0, userFunctions_1.confirmRetrievedPassword)(password, collectedUserPassword) !== true) {
            res.status(400).send({ success: false, message: "You have entered an incorrect password" });
            return;
        }
        ;
        const token = await (0, jwtAuth_1.generateSellerToken)(seller);
        res.status(200).send({
            success: true,
            message: "You have successfully logged in",
            seller,
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    }
    ;
}
exports.loginSeller = loginSeller;
;
async function updateSellerAccount(req, res) {
    try {
        if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.phone_number || !req.body.address) {
            res.status(400).json({
                success: false,
                message: "Please enter required fields"
            });
            return;
        }
        ;
        const { first_name, last_name, email, phone_number, address } = req.body;
        const seller = await (0, sellerFunctions_1.getSellerById)(req.seller.id);
        if (await (0, sellerFunctions_1.checkEmail)(email) && !(0, userFunctions_1.checkIfEntriesMatch)(seller.email, email)) {
            res.status(400).send({
                success: false,
                message: "Email already exists"
            });
            return;
        }
        ;
        if (await (0, sellerFunctions_1.checkPhoneNumber)(phone_number) && !(0, userFunctions_1.checkIfEntriesMatch)(seller.phone_number, phone_number)) {
            res.status(400).send({
                success: false,
                message: "Phone number already exists"
            });
            return;
        }
        ;
        await (0, sellerFunctions_1.updateSellerAccountDetails)(req.seller.id, first_name, last_name, email, phone_number, address);
        const updated = await (0, sellerFunctions_1.getSellerById)(req.seller.id);
        res.status(200).send({
            success: true,
            message: 'Dear Seller, your account has been updated',
            updated
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating seller account',
            error: error.message
        });
    }
}
exports.updateSellerAccount = updateSellerAccount;
async function getSellerAccount(req, res) {
    try {
        const seller = await (0, sellerFunctions_1.getSellerById)(req.seller.id);
        if (!seller) {
            res.status(400).send({
                success: false,
                message: "Oops! You do not have an account, sign up to continue."
            });
            return;
        }
        ;
        res.status(200).send({
            success: true,
            seller
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error getting account details',
            error: error.message
        });
    }
}
exports.getSellerAccount = getSellerAccount;
