// const {DataTypes} = require('sequelize')
// const storeModel = require('../models/store')
// const sequelize = require('../config/database');
// const Store = storeModel(sequelize, DataTypes)

import {Store} from '../models/store';
export type StoreType = {
    name: string, 
    address: string,
    seller_id: number,
    image_key: string
}

export async function createAStore(seller_id: number, name: string, address: string) {
    try {
        const storeDetails = {seller_id, name, address}
        const store = await Store.create(storeDetails)
        return JSON.parse(JSON.stringify(store))
    } catch (error) {
        throw new Error(`Error creating store: ${error}`)
    }
}

export async function checkStoreName(name: string) {
    try {
        const storeNameCheck = await Store.findOne({
            where: { name }
        })
        return storeNameCheck ? true : false
    } catch (error) {
        throw new Error(`Error checking store name`)
    }
}

export async function getStoreIdByStoreName(name: string) {
    try {
        const storeId = await Store.findOne({
            where: { name }
        })
        return storeId.dataValues.id
    } catch (error) {
        return error
    }
};

export async function checkIfSellerHasStore(seller_id: number) {
    try {
        const store = await Store.findOne({
            where: {seller_id}
        })
        return store
    } catch (error) {
        return error
    }
}

async function getStoreIdBySellerId(seller_id: number) {
    try {
        const storeId = await Store.findOne({
            where: { seller_id }
        })
        return storeId.dataValues.id
    } catch (error) {
        return error
    }
}

export async function getStoreById(id: number, seller_id: number) {
    try {
        const store = await Store.findOne({
            where: { id, seller_id }
        });
        return JSON.parse(JSON.stringify(store))
    } catch (error) {
        throw new Error(`Error getting store by id`)
    }
}

async function updateStoreDetails(id: number, seller_id: number, name: string, address: string) {
    try {
        const updatedStore = await Store.update({name, address}, {
            where: { id, seller_id }
        })
        return updatedStore
    } catch (error) {
        return error
    }
}

function checkIfEntriesMatch (initialValue: string, newValue: string) {
    return initialValue === newValue
}

export async function deleteAStore(id: number, seller_id: number) {
    try {
        const removeStore = await Store.destroy({
            where: {id, seller_id}
        })
        return removeStore
    } catch (error) {
        return error
    }
}

export async function saveStoreImageKey(id: number, image_key: string) {
    try {
        const updated = await Store.update({image_key}, {
            where: { id }
        })
        return updated
    } catch (error) {
        return error
    }
}

export async function getStoreImageKey (id: number) {
    try {
        const key = await Store.findOne({
            attributes: ['image_key'],
            where: { id }
        })
        return key.dataValues.image_key
    } catch (error) {
        return error
    }
}