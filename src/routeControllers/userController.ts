import {Request, Response, NextFunction} from 'express'
import {UserType} from '../functions/userFunctions'
import {
    createUser, 
    hashUserPassword, 
    checkEmail, 
    checkPhoneNumber, 
    getUserByEmail
} from '../functions/userFunctions';

export const signUpUser = async(req: Request, res: Response) => {
    console.log(req.body);
    try {
        if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.phone_number || !req.body.password || !req.body.address || !req.body.state || !req.body.postal_code) {
            res.status(400).json({ 
                success: false, 
                message: "Please enter all required fields"
            });
            return;
        }

        const {first_name, last_name, email, phone_number, password, address, state, postal_code} = req.body

        if (await checkEmail(email)) { 
            res.status(400).send({message: "Email already exists"}) 
            return
        }
        if (await checkPhoneNumber(phone_number)) {
            res.status(400).send({message: "Phone number already exists"}) 
            return
        }

        const hashed_password = await hashUserPassword(password)
        const userDetails: UserType = {first_name, last_name, email, phone_number, address, state, postal_code, hashed_password}
        await createUser(userDetails)
        const user = await getUserByEmail(email)
        res.status(201).send({ message : "Your account has been created", user})   

        } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    };
};
