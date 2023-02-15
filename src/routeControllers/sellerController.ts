import { Request, Response } from "express";
import { hashPassword } from "../functions/userFunctions";
import { 
    SellerType, 
    createSeller,
    checkEmail, 
    checkPhoneNumber,
    getSellerByEmail
} from "../functions/sellerFunctions";

export async function signUpSeller (req: Request, res: Response) {
    try {
        console.log(req.body.store_id)
        console.log(req.body.image_key)
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
        console.log(hashed_password)
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
