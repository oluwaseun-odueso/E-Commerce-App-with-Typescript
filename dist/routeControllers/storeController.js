"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = void 0;
const storeFunctions_1 = require("../functions/storeFunctions");
async function createStore(req, res) {
    try {
        if (!req.body.name || !req.body.address) {
            res.status(400).json({
                success: false,
                message: "Please enter all required fields"
            });
            return;
        }
        ;
        const { name, address } = req.body;
        if (await (0, storeFunctions_1.checkIfSellerHasStore)(req.seller.id)) {
            res.status(400).send({ message: "Cannot create store, you already have a store" });
            return;
        }
        ;
        if (await (0, storeFunctions_1.checkStoreName)(name)) {
            res.status(400).send({ message: "Shop already exists" });
            return;
        }
        ;
        const store = await (0, storeFunctions_1.createAStore)(req.seller.id, name, address);
        res.status(201).send({ message: "Store created", store });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: "Error creating store",
            error: error.message
        });
    }
    ;
}
exports.createStore = createStore;
;
