"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSeller = void 0;
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
createSeller({
    first_name: "Tine",
    last_name: "Azikwe",
    email: 'tine@tin.com',
    phone_number: '0707744338872',
    address: "23, Kofo Street",
    password: 'tineazikwe'
}).then(i => console.log(i))
    .catch(error => console.log(error));
