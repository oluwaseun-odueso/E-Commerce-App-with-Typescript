"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveStoreImageKey = exports.deleteAStore = exports.checkIfEntriesMatch = exports.updateStoreDetails = exports.getStoreById = exports.checkIfSellerHasStore = exports.getStoreIdByStoreName = exports.checkStoreName = exports.createAStore = void 0;
const store_1 = require("../models/store");
async function createAStore(seller_id, name, address) {
    try {
        const storeDetails = { seller_id, name, address };
        const store = await store_1.Store.create(storeDetails);
        return JSON.parse(JSON.stringify(store));
    }
    catch (error) {
        throw new Error(`Error creating store: ${error}`);
    }
    ;
}
exports.createAStore = createAStore;
;
// createAStore(1, "Watches", "Adebayo Street")
//     .then(i => console.log(i))
//     .catch(error => console.log(error))
async function checkStoreName(name) {
    try {
        const storeNameCheck = await store_1.Store.findOne({
            where: { name }
        });
        return storeNameCheck ? true : false;
    }
    catch (error) {
        throw new Error(`Error checking store name`);
    }
}
exports.checkStoreName = checkStoreName;
// checkStoreName('Watches')
//     .then(i => console.log(i))
//     .catch(error => console.log(error))
async function getStoreIdByStoreName(name) {
    try {
        const storeId = await store_1.Store.findOne({
            where: { name }
        });
        return JSON.parse(JSON.stringify(storeId)).id;
    }
    catch (error) {
        throw new Error(`Error getting store id`);
    }
}
exports.getStoreIdByStoreName = getStoreIdByStoreName;
;
// getStoreIdByStoreName("Watches")
//     .then(i => console.log(i))
//     .catch(error => console.log(error))
async function checkIfSellerHasStore(seller_id) {
    try {
        const store = await store_1.Store.findOne({
            where: { seller_id }
        });
        return JSON.parse(JSON.stringify(store));
    }
    catch (error) {
        throw new Error(`Error checking if seller already has a store.`);
    }
}
exports.checkIfSellerHasStore = checkIfSellerHasStore;
// checkIfSellerHasStore(1)
//     .then(i => console.log(i))
//     .catch(error => console.log(error))
async function getStoreIdBySellerId(seller_id) {
    try {
        const storeId = await store_1.Store.findOne({
            where: { seller_id }
        });
        return JSON.parse(JSON.stringify(storeId)).id;
    }
    catch (error) {
        throw new Error(`Error getting store id with seller id`);
    }
    ;
}
;
// getStoreIdBySellerId(1)
//     .then(i => console.log(i))
//     .catch(error => console.log(error))
async function getStoreById(id, seller_id) {
    try {
        const store = await store_1.Store.findOne({
            where: { id, seller_id }
        });
        return JSON.parse(JSON.stringify(store));
    }
    catch (error) {
        throw new Error(`Error getting store by id`);
    }
    ;
}
exports.getStoreById = getStoreById;
;
// getStoreById(1, 1)
//     .then(i => console.log(i))
//     .catch(error => console.log(error))
async function updateStoreDetails(id, seller_id, name, address) {
    try {
        const updatedStore = await store_1.Store.update({ name, address }, {
            where: { id, seller_id }
        });
        // return JSON.parse(JSON.stringify(updatedStore))
        return updatedStore;
    }
    catch (error) {
        throw new Error(`Error updating store details`);
    }
}
exports.updateStoreDetails = updateStoreDetails;
// updateStoreDetails(1, 1, "Watches", "Ademola Street")
//     .then(i => console.log(i))
//     .catch(error => console.log(error))
function checkIfEntriesMatch(initialValue, newValue) {
    return initialValue === newValue;
}
exports.checkIfEntriesMatch = checkIfEntriesMatch;
async function deleteAStore(id, seller_id) {
    try {
        const removeStore = await store_1.Store.destroy({
            where: { id, seller_id }
        });
        return removeStore;
    }
    catch (error) {
        return error;
    }
}
exports.deleteAStore = deleteAStore;
async function saveStoreImageKey(id, image_key) {
    try {
        const updated = await store_1.Store.update({ image_key }, {
            where: { id }
        });
        return updated;
    }
    catch (error) {
        return error;
    }
}
exports.saveStoreImageKey = saveStoreImageKey;
// export async function getStoreImageKey (id: number) {
//     try {
//         const key = await Store.findOne({
//             attributes: ['image_key'],
//             where: { id }
//         })
//         return key.dataValues.image_key
//     } catch (error) {
//         return error
//     }
// }
