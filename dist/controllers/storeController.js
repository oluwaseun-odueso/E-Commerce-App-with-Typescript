"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStore = exports.updateStore = exports.getAStore = exports.createStore = void 0;
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
            res.status(400).send({ message: "You already have a store" });
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
async function getAStore(req, res) {
    try {
        const store = await (0, storeFunctions_1.getStoreBySellerId)(req.seller.id);
        if (!store) {
            res.status(400).send({ message: "Store does not exist" });
            return;
        }
        res.status(200).send({ success: true, store });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: "Error viewing store",
            error: error.message
        });
    }
    ;
}
exports.getAStore = getAStore;
;
async function updateStore(req, res) {
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
        const store = await (0, storeFunctions_1.getStoreBySellerId)(req.seller.id);
        if (!store) {
            res.status(400).send({
                success: false,
                message: "Store does not exist"
            });
            return;
        }
        ;
        if (await (0, storeFunctions_1.checkStoreName)(name) && !(0, storeFunctions_1.checkIfEntriesMatch)(store.name, name)) {
            res.status(400).send({ message: "A store with this name already exists" });
            return;
        }
        ;
        await (0, storeFunctions_1.updateStoreDetails)(req.seller.id, name, address);
        const updated = await (0, storeFunctions_1.getStoreBySellerId)(req.seller.id);
        res.status(200).send({ message: 'Your store details has been updated', updated });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating store details',
            error: error.message
        });
    }
    ;
}
exports.updateStore = updateStore;
;
async function deleteStore(req, res) {
    try {
        const store = await (0, storeFunctions_1.deleteAStore)(req.seller.id);
        if (!store) {
            res.status(400).send({
                success: false,
                message: "You do not have a store"
            });
            return;
        }
        ;
        res.status(200).send({
            success: true,
            message: "Store closed"
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
    ;
}
exports.deleteStore = deleteStore;
;
