import {Store} from '../models/store';

export type StoreType = {
    name: string, 
    address: string,
    seller_id: number,
    image_key: string
}

export async function createAStore(seller_id: number, name: string, address: string): Promise<{}> {
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

export async function checkIfSellerHasStore(seller_id: number): Promise<{}> {
    try {
        const store = await Store.findOne({
            where: {seller_id}
        })
        return JSON.parse(JSON.stringify(store))
    } catch (error) {
        throw new Error(`Error checking if seller already has a store.`)
    };
};

export async function getStoreIdBySellerId(seller_id: number): Promise<number> {
    try {
        const storeId = await Store.findOne({
            where: { seller_id }
        })
        return JSON.parse(JSON.stringify(storeId)).id
    } catch (error) {
        throw new Error(`Error getting store id with seller id`)
    };
};

export async function getStoreById(id: number, seller_id: number): Promise<{}> {
    try {
        const store = await Store.findOne({
            where: { id, seller_id }
        });
        return JSON.parse(JSON.stringify(store))
    } catch (error) {
        throw new Error(`Error getting store by id`)
    };
};

export async function updateStoreDetails(id: number, seller_id: number, name: string, address: string) {
    try {
        const updatedStore = await Store.update({name, address}, {
            where: { id, seller_id }
        });
        // return JSON.parse(JSON.stringify(updatedStore))
        return updatedStore
    } catch (error) {
        throw new Error(`Error updating store details`)
    };
};

export function checkIfEntriesMatch (initialValue: string, newValue: string): boolean {
    return initialValue === newValue
};

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