import e, {Request, Response, NextFunction} from 'express'
import { generateToken } from '../auth/jwtAuth';
import {UserType} from '../functions/userFunctions'
import {
    createUser, 
    hashUserPassword, 
    checkEmail, 
    checkPhoneNumber, 
    getUserByEmail,
    retrieveHashedPassword,
    confirmRetrievedPassword
} from '../functions/userFunctions';

export const signUpUser = async(req: Request, res: Response) => {
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
            res.status(400).send({ success: false, message: "Email already exists"}) 
            return
        }
        if (await checkPhoneNumber(phone_number)) {
            res.status(400).send({ success: false, message: "Phone number already exists"}) 
            return
        }

        const hashed_password = await hashUserPassword(password)
        const userDetails: UserType = {first_name, last_name, email, phone_number, address, state, postal_code, hashed_password}
        await createUser(userDetails)
        const user = await getUserByEmail(email)
        res.status(201).send({ success: true, message : "Your account has been created", user})   

        } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    };
};

export const loginUser = async(req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ 
                success: false, 
                message: "Please enter email and password"
            });
            return;
        }
        const {email, password} = req.body

        const collectedUserPassword = await retrieveHashedPassword(email)
            if (await confirmRetrievedPassword(password, collectedUserPassword) !== true) {
                res.status(400).send({ success: false, message: "You have entered an incorrect password"})
                return;
            };

            const user = await getUserByEmail(email);
            const token = await generateToken(user);
            res.status(200).send({
                success: true,
                message: "You have successfully logged in",
                user, 
                token
            })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Error loggin in',
            error: error.message
        });
    }
}
