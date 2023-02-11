"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpUser = void 0;
const userFunctions_1 = require("../functions/userFunctions");
const signUpUser = async (req, res) => {
    console.log(req.body.password);
    try {
        if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.phone_number || !req.body.password || !req.body.address || !req.body.state || !req.body.postal_code) {
            res.status(400).json({
                success: false,
                message: "Please enter all required fields"
            });
            return;
        }
        const { first_name, last_name, email, phone_number, password, address, state, postal_code } = req.body;
        if (await (0, userFunctions_1.checkEmail)(email)) {
            res.status(400).send({ message: "Email already exists" });
            return;
        }
        if (await (0, userFunctions_1.checkPhoneNumber)(phone_number)) {
            res.status(400).send({ message: "Phone number already exists" });
            return;
        }
        const hashed_password = await (0, userFunctions_1.hashUserPassword)(password);
        const userDetails = { first_name, last_name, email, phone_number, address, state, postal_code, hashed_password };
        await (0, userFunctions_1.createUser)(userDetails);
        const user = await (0, userFunctions_1.getUserByEmail)(email);
        res.status(201).send({ message: "Your account has been created", user });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
    ;
};
exports.signUpUser = signUpUser;
