import {Seller} from '../models/seller';
import bcrypt from 'bcrypt';

export type SellerType = {
    first_name: string, 
    last_name: string,
    email: string,
    password: string,
    store_id?: string,
    phone_number: string,
    address: number,
    image_key?: string,
}
