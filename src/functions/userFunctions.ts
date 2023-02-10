import {User} from '../models/user';
import bcrypt from 'bcrypt';

export type UserType = {
    first_name: string, 
    last_name?: string,
    email: string,
    phone_number: string,
    hashedPassword: string,
    address: string,
    state: string,
    postal_code?: number
    image_key?: string
}

export async function createUser(userDetails: UserType) {
    try {
        const user = await User.create(userDetails)
        return user
    } catch (error) {
        throw new Error(`Error creating user: ${error}`)
        // return error
    }
}

export async function hashUserPassword (password: string): Promise<string> {
    try {
        const saltRounds: number = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash
    } catch (error) {
        throw new Error(`Error generating password hash: ${error}`);
    }
}

export async function checkEmail (email: string): Promise<boolean> {
    try {
        const emailCheck = await User.findOne({
            where: {email}
        })
        return emailCheck ? true : false
    } catch (error) {
        throw new Error(`Error checking email: ${error}`)
    }
}

export async function checkPhoneNumber(phone_number: string): Promise<boolean> {
    try {
        const phoneNumberCheck = await User.findOne({
            where: {phone_number}
        })
        return phoneNumberCheck ? true : false
    } catch (error) {
        throw new Error(`Error checking phone_number: ${error}`)
    }
}

export async function getUserByEmail(email: string) {
    try {
        const result = await User.findOne({
            attributes: { exclude: ['password' ,'image_key']},
            where: { email }
        })
        return result
    } catch (error) {
        throw new Error(`Error getting user by email: ${error}`)
    }
}