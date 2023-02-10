import {User} from '../models/user';
import bcrypt from 'bcrypt';

export type UserType = {
    first_name: string, 
    last_name: string,
    email: string,
    phone_number: string,
    password: string,
    address: string,
    state: string,
    postal_code?: number
    image_key?: string
}

async function createUser(userDetails: UserType) {
    try {
        const user = await User.create(userDetails)
        return user
    } catch (error) {
        throw new Error(`Error creating user: ${error}`)
        // return error
    }
}

async function hashUserPassword (password: string): Promise<string> {
    try {
        const saltRounds: number = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash
    } catch (error) {
        throw new Error('Error generating password hash');
    }
}