import {User} from '../models/user';
import bcrypt from 'bcrypt';
import sequelize from '../connection/database';

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
        return error
    }
}

createUser({
    first_name: "Oluwaseun",
    last_name: "Odueso",
    email: "seunoduez@gmail.com", 
    phone_number: "09066318539",
    password: "Timpel",
    address: "27, Dayo Shittu Street",
    state: "Ogun state"
})
    .then(i => console.log(i));