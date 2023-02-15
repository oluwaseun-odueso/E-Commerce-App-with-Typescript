"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserAccount = exports.getUserAccount = exports.updateUserAccount = exports.loginUser = exports.signUpUser = void 0;
const jwtAuth_1 = require("../auth/jwtAuth");
const userFunctions_1 = require("../functions/userFunctions");
const userFunctions_2 = require("../functions/userFunctions");
async function signUpUser(req, res) {
    try {
        if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.phone_number || !req.body.password || !req.body.address || !req.body.state || !req.body.postal_code) {
            res.status(400).json({
                success: false,
                message: "Please enter all required fields"
            });
            return;
        }
        const { first_name, last_name, email, phone_number, password, address, state, postal_code } = req.body;
        if (await (0, userFunctions_2.checkEmail)(email)) {
            res.status(400).send({ success: false, message: "Email already exists" });
            return;
        }
        if (await (0, userFunctions_2.checkPhoneNumber)(phone_number)) {
            res.status(400).send({ success: false, message: "Phone number already exists" });
            return;
        }
        const hashed_password = await (0, userFunctions_2.hashUserPassword)(password);
        const userDetails = { first_name, last_name, email, phone_number, address, state, postal_code, hashed_password };
        await (0, userFunctions_2.createUser)(userDetails);
        const user = await (0, userFunctions_2.getUserByEmail)(email);
        res.status(201).send({ success: true, message: "Your account has been created", user });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
    ;
}
exports.signUpUser = signUpUser;
;
async function loginUser(req, res) {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({
                success: false,
                message: "Please enter email and password"
            });
            return;
        }
        const { email, password } = req.body;
        const user = await (0, userFunctions_2.getUserByEmail)(email);
        if (!user) {
            res.status(400).send({ success: false, message: "Email does not exist" });
            return;
        }
        ;
        const collectedUserPassword = await (0, userFunctions_2.retrieveHashedPassword)(email);
        if (await (0, userFunctions_2.confirmRetrievedPassword)(password, collectedUserPassword) !== true) {
            res.status(400).send({ success: false, message: "You have entered an incorrect password" });
            return;
        }
        ;
        const token = await (0, jwtAuth_1.generateUserToken)(user);
        res.status(200).send({
            success: true,
            message: "You have successfully logged in",
            user,
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
exports.loginUser = loginUser;
;
async function updateUserAccount(req, res) {
    try {
        if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.phone_number || !req.body.address || !req.body.state || !req.body.postal_code) {
            res.status(400).json({
                success: false,
                message: "Please enter required fields"
            });
            return;
        }
        ;
        const { first_name, last_name, email, phone_number, address, state, postal_code } = req.body;
        const user = await (0, userFunctions_1.getUserById)(req.user.id);
        if (await (0, userFunctions_2.checkEmail)(email) && !(0, userFunctions_2.checkIfEntriesMatch)(user.email, email)) {
            res.status(400).send({
                success: false,
                message: "Email already exists"
            });
            return;
        }
        ;
        if (await (0, userFunctions_2.checkPhoneNumber)(phone_number) && !(0, userFunctions_2.checkIfEntriesMatch)(user.phone_number, phone_number)) {
            res.status(400).send({
                success: false,
                message: "Phone number already exists"
            });
            return;
        }
        ;
        await (0, userFunctions_2.updateUserAccountDetails)(req.user.id, first_name, last_name, email, phone_number, address, state, postal_code);
        const updated = await (0, userFunctions_1.getUserById)(req.user.id);
        res.status(200).send({
            success: true,
            message: 'User account details updated',
            updated
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating user account',
            error: error.message
        });
    }
    ;
}
exports.updateUserAccount = updateUserAccount;
;
async function getUserAccount(req, res) {
    try {
        const user = await (0, userFunctions_1.getUserById)(req.user.id);
        if (!user) {
            res.status(400).send({
                success: false,
                message: "Oops! You do not have an account, sign up to continue."
            });
            return;
        }
        ;
        res.status(200).send({
            success: true,
            user
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error getting account details',
            error: error.message
        });
    }
    ;
}
exports.getUserAccount = getUserAccount;
;
async function deleteUserAccount(req, res) {
    try {
        const deletedAccount = await (0, userFunctions_2.deleteAccount)(req.user.id);
        if (deletedAccount === 1) {
            res.status(200).send({
                success: true,
                message: "Your account has been deleted!"
            });
            return;
        }
        res.status(400).send({
            success: false,
            message: "Account does not exist"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Could not delete your account',
            error: error.message
        });
    }
}
exports.deleteUserAccount = deleteUserAccount;
