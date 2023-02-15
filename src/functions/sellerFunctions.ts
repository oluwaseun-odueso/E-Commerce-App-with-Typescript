import {Seller} from '../models/seller';
import bcrypt from 'bcrypt';

export type SellerType = {
    first_name: string, 
    last_name: string,
    email: string,
    store_id?: string,
    phone_number: string,
    address: string,
    image_key?: string,
    password: string
};

export async function createSeller(sellerDetails: SellerType) {
    try {
        const seller = await Seller.create(sellerDetails)
        return JSON.parse(JSON.stringify(seller))
    } catch (error) {
        throw new Error(`Error creating user: ${error}`)
    }
}

createSeller({
    first_name: "Tine",
    last_name: "Azikwe",
    email: 'tine@tin.com',
    phone_number: '0707744338872',
    address: "23, Kofo Street",
    password: 'tineazikwe'
}).then(i => console.log(i))
    .catch(error => console.log(error))