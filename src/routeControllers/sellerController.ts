import { Request, Response } from "express";
import { confirmRetrievedPassword, hashPassword } from "../functions/userFunctions";
import { 
    SellerType, 
    createSeller,
    checkEmail, 
    checkPhoneNumber,
    getSellerByEmail,
    retrieveHashedPassword
} from "../functions/sellerFunctions";
import {generateSellerToken} from '../auth/jwtAuth'

export async function signUpSeller (req: Request, res: Response) {
    try {
        if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.phone_number || !req.body.address || !req.body.password) {
            res.status(400).json({ 
                success: false, 
                message: "Please enter all required fields"
            });
            return;
        }

        const {first_name, last_name, email, store_id, phone_number, address, image_key, password} = req.body

        if (await checkEmail(email)) { 
            res.status(400).send({ success: false, message: "Email already exists"}) 
            return
        }
        if (await checkPhoneNumber(phone_number)) {
            res.status(400).send({ success: false, message: "Phone number already exists"}) 
            return
        }

        const hashed_password = await hashPassword(password);
        const sellerDetails: SellerType = {first_name, last_name, email, store_id, phone_number, address, image_key, hashed_password};
        await createSeller(sellerDetails);
        const seller = await getSellerByEmail(email)
        res.status(201).send({ success: true, message : "Your account has been created", seller})   

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Error creating seller',
            error: error.message
        });
    }
}

export async function loginSeller(req: Request, res: Response) {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ 
                success: false, 
                message: "Please enter email and password"
            });
            return;
        }
        const {email, password} = req.body;

        const seller = await getSellerByEmail(email);
        if (!seller) {
            res.status(400).send({ success: false, message: "Email does not exist"})
            return;
        };

        const collectedUserPassword = await retrieveHashedPassword(email)
        if (await confirmRetrievedPassword(password, collectedUserPassword) !== true) {
            res.status(400).send({ success: false, message: "You have entered an incorrect password"})
            return;
        };
        
        const token = await generateSellerToken(seller);
        res.status(200).send({
            success: true,
            message: "You have successfully logged in",
            seller, 
            token
        })
    } catch (error) {
        
    }
}
