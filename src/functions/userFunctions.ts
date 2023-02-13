import {User} from '../models/user';
import bcrypt, { hash } from 'bcrypt';
import { updateUserAccount } from '../routeControllers/userController';

export type UserType = {
    first_name: string, 
    last_name?: string,
    email: string,
    phone_number: string,
    address: string,
    state: string,
    postal_code?: number,
    hashed_password?: string,
    image_key?: string
}

export async function createUser(userDetails: UserType): Promise<{}> {
    try {
        const user = await User.create(userDetails)
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        throw new Error(`Error creating user: ${error}`)
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

export async function checkEmail (email: string): Promise<boolean | Error> {
    try {
        const emailCheck = await User.findOne({
            where: {email}
        })
        return emailCheck ? true : false
    } catch (error) {
        throw new Error(`Error checking email: ${error}`)
    }
}

export async function checkPhoneNumber(phone_number: string): Promise<boolean | Error> {
    try {
        const phoneNumberCheck = await User.findOne({
            where: {phone_number}
        })
        return phoneNumberCheck ? true : false
    } catch (error) {
        throw new Error(`Error checking phone_number: ${error}`)
    };
};

export function checkIfEntriesMatch(firstValue: string, secondValue: string): boolean {
    return firstValue === secondValue;
}

export async function getUserByEmail(email: string): Promise<UserType> {
    try {
        const user = await User.findOne({
            attributes: { exclude: ['hashed_password' ,'image_key', 'createdAt', 'updatedAt']},
            where: { email }
        })
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        throw new Error(`Error getting user by email: ${error}`)
    }
}

export async function getUserById(id: number): Promise<UserType> {
    try {
        const user = await User.findOne({
            attributes: { exclude: ['hashed_password' ,'image_key', 'createdAt', 'updatedAt']},
            where: { id }
        })
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        throw new Error(`Error getting user by id: ${error}`)
    }
}

export async function retrieveHashedPassword(email: string): Promise<string> {
    try {
        const userPassword = await User.findOne({
            attributes: ["hashed_password"],
            where: {email}
        });
        return JSON.parse(JSON.stringify(userPassword)).hashed_password;
    } catch (error) {
        throw new Error(`Error retrieving user password: ${error}`)
    }
}

export async function confirmRetrievedPassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
        const confirmPassword = await bcrypt.compare(password, hashedPassword)
        return confirmPassword;
    } catch (error) {
        throw new Error(`Error comfirming user password: ${error}`)
    };
};

export async function updateUserAccountDetails(id: number, first_name: string, last_name: string, email: string, phone_number: string, address: string, state: string, postal_code: number) {
    try {
        const updated = await User.update({first_name, last_name, email, phone_number, address, state, postal_code}, {
            where: { id }
        })
        return updated
    } catch (error) {
        throw new Error(`Error updating user details: ${error}`)
    }
};

export async function deleteAccount(id: number): Promise<number> {
    try {
        const deletedAccount = await User.destroy({
            where: {id}
        })
        return deletedAccount;
    } catch (error) {
        throw new Error(`Error deleting user account: ${error}`)
    };
};

