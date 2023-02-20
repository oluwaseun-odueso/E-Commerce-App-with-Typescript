"use strict";
// const {DataTypes} = require('sequelize')
// const storeModel = require('../models/store')
// const sequelize = require('../config/database');
// const Store = storeModel(sequelize, DataTypes)
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreImageKey = exports.saveStoreImageKey = exports.deleteAStore = exports.getStoreById = exports.checkIfSellerHasStore = exports.getStoreIdByStoreName = exports.checkStoreName = exports.createAStore = void 0;
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
}
exports.createAStore = createAStore;
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
async function getStoreIdByStoreName(name) {
    try {
        const storeId = await store_1.Store.findOne({
            where: { name }
        });
        return storeId.dataValues.id;
    }
    catch (error) {
        return error;
    }
}
exports.getStoreIdByStoreName = getStoreIdByStoreName;
;
async function checkIfSellerHasStore(seller_id) {
    try {
        const store = await store_1.Store.findOne({
            where: { seller_id }
        });
        return store;
    }
    catch (error) {
        return error;
    }
}
exports.checkIfSellerHasStore = checkIfSellerHasStore;
async function getStoreIdBySellerId(seller_id) {
    try {
        const storeId = await store_1.Store.findOne({
            where: { seller_id }
        });
        return storeId.dataValues.id;
    }
    catch (error) {
        return error;
    }
}
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
}
exports.getStoreById = getStoreById;
async function updateStoreDetails(id, seller_id, name, address) {
    try {
        const updatedStore = await store_1.Store.update({ name, address }, {
            where: { id, seller_id }
        });
        return updatedStore;
    }
    catch (error) {
        return error;
    }
}
function checkIfEntriesMatch(initialValue, newValue) {
    return initialValue === newValue;
}
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
async function getStoreImageKey(id) {
    try {
        const key = await store_1.Store.findOne({
            attributes: ['image_key'],
            where: { id }
        });
        return key.dataValues.image_key;
    }
    catch (error) {
        return error;
    }
}
exports.getStoreImageKey = getStoreImageKey;
