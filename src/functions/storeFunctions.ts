import {Store} from '../models/store';
import {StoreType} from "../types/custom"

export async function createAStore(seller_id: number, name: string, address: string): Promise<StoreType> {
    try {
        const storeDetails = {seller_id, name, address}
        const store = await Store.create(storeDetails)
        return JSON.parse(JSON.stringify(store))
    } catch (error) {
        throw new Error(`Error creating store: ${error}`)
    };
};

export async function checkStoreName(name: string): Promise<boolean> {
    try {
        const storeNameCheck = await Store.findOne({
            where: { name }
        })
        return storeNameCheck ? true : false
    } catch (error) {
        throw new Error(`Error checking store name`)
    };
};

export async function getStoreIdByStoreName(name: string): Promise<number> {
    try {
        const storeId = await Store.findOne({
            where: { name }
        })
        return JSON.parse(JSON.stringify(storeId)).id
    } catch (error) {
        throw new Error(`Error getting store id`)
    }
};

export async function checkIfSellerHasStore(seller_id: number): Promise<StoreType> {
    try {
        const store = await Store.findOne({
            where: {seller_id}
        })
        return JSON.parse(JSON.stringify(store))
    } catch (error) {
        throw new Error(`Error checking if seller already has a store.`)
    };
};

export async function getStoreBySellerId(seller_id: number): Promise<StoreType> {
    try {
        const store = await Store.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt']},
            where: { seller_id }
        })
        return JSON.parse(JSON.stringify(store))
    } catch (error) {
        throw new Error(`Error getting store id with seller id`)
    };
};

export async function getStoreById(id: number, seller_id: number): Promise<StoreType> {
    try {
        const store = await Store.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt']},
            where: { id, seller_id }
        });
        return JSON.parse(JSON.stringify(store))
    } catch (error) {
        throw new Error(`Error getting store by id`)
    };
};

export async function updateStoreDetails(seller_id: number, name: string, address: string) {
    try {
        const updatedStore = await Store.update({name, address}, {
            where: { seller_id }
        });
        return updatedStore
    } catch (error) {
        throw new Error(`Error updating store details`)
    };
};

export function checkIfEntriesMatch (initialValue: string, newValue: string): boolean {
    return initialValue === newValue
};

export async function deleteAStore(seller_id: number) {
    try {
        const removeStore = await Store.destroy({
            where: {seller_id}
        })
        return removeStore
    } catch (error) {
        throw new Error(`Error deleting store details`)
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