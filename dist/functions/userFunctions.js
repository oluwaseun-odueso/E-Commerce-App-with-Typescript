"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
async function createUser(userDetails) {
    try {
        const user = await user_1.User.create(userDetails);
        return user;
    }
    catch (error) {
        return error;
    }
}
createUser({
    first_name: "Oluwaseun",
    last_name: "Odueso",
    email: "seunoduez@gmail.com",
    phone_number: "09066318539",
    password: "Timpel",
    address: "27, Dayo Shittu Street",
    state: "Ogun state"
})
    .then(i => console.log(i));
