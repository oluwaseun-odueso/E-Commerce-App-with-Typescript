import {Seller} from '../models/seller';

export type SellerType = {
    first_name: string, 
    last_name: string,
    email: string,
    store_id?: string,
    phone_number: string,
    address: string,
    image_key?: string,
    hashed_password: string
};

export async function createSeller(sellerDetails: SellerType): Promise<{}> {
    try {
        const seller = await Seller.create(sellerDetails)
        return JSON.parse(JSON.stringify(seller))
    } catch (error) {
        throw new Error(`Error creating seller: ${error}`)
    };
};

export async function checkEmail (email: string): Promise<boolean> {
    try {
        const emailCheck = await Seller.findOne({
            where: {email}
        })
        return emailCheck ? true : false
    } catch (error) {
        throw new Error(`Error checking if email exists: ${error}`)
    };
};

export async function checkPhoneNumber(phone_number: string): Promise<boolean> {
    try {
        const phoneNumberCheck = await Seller.findOne({
            where: {phone_number}
        })
        return phoneNumberCheck ? true : false
    } catch (error) {
        throw new Error(`Error checking if phone_number exists: ${error}`)
    };
};

export async function getSellerByEmail(email: string): Promise<SellerType> {
    try {
        const seller = await Seller.findOne({
            attributes: { exclude: ['hashed_password' ,'image_key', 'createdAt', 'updatedAt']},
            where: { email }
        })
        return JSON.parse(JSON.stringify(seller))
    } catch (error) {
        throw new Error(`Error getting seller by email: ${error}`)
    }
};

export async function getSellerById(id: number): Promise<SellerType> {
    try {
        const seller = await Seller.findOne({
            attributes: { exclude: ['hashed_password' ,'image_key', 'createdAt', 'updatedAt']},
            where: { id }
        })
        return JSON.parse(JSON.stringify(seller))
    } catch (error) {
        throw new Error(`Error getting seller by id: ${error}`)
    }
}

export async function retrieveHashedPassword(email: string): Promise<string> {
    try {
        const sellerPassword = await Seller.findOne({
            attributes: ["hashed_password"],
            where: {email}
        });
        return JSON.parse(JSON.stringify(sellerPassword)).hashed_password;
    } catch (error) {
        throw new Error(`Error retrieving seller password: ${error}`)
    }
}

export async function updateSellerAccountDetails(id: number, first_name: string, last_name: string, email: string, phone_number: string, address: string) {
    try {
        const updated = await Seller.update({first_name, last_name, email, phone_number, address}, {
            where: { id }
        });
        return updated
    } catch (error) {
        throw new Error(`Error updating seller details: ${error}`)
    };
};

export async function deleteSellerAccount(id: number): Promise<number> {
    try {
        const deletedAccount = await Seller.destroy({
            where: {id}
        })
        return deletedAccount;
    } catch (error) {
        throw new Error(`Error deleting seller account: ${error}`)
    };
};

