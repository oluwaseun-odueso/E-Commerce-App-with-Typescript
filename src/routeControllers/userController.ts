import {Request, Response, NextFunction} from 'express'
import { generateUserToken } from '../auth/jwtAuth';
import {
    UserType,
    createUser, 
    getUserById, 
    hashUserPassword, 
    checkEmail, 
    checkPhoneNumber,
    checkIfEntriesMatch, 
    getUserByEmail,
    retrieveHashedPassword,
    confirmRetrievedPassword,
    updateUserAccountDetails,
    deleteAccount
} from '../functions/userFunctions';

export async function signUpUser (req: Request, res: Response) {
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

export async function loginUser (req: Request, res: Response) {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ 
                success: false, 
                message: "Please enter email and password"
            });
            return;
        }
        const {email, password} = req.body

        const user = await getUserByEmail(email);
        if (!user) {
            res.status(400).send({ success: false, message: "Email does not exist"})
            return;
        };

        const collectedUserPassword = await retrieveHashedPassword(email)
            if (await confirmRetrievedPassword(password, collectedUserPassword) !== true) {
                res.status(400).send({ success: false, message: "You have entered an incorrect password"})
                return;
            };

            const token = await generateUserToken(user);
            res.status(200).send({
                success: true,
                message: "You have successfully logged in",
                user, 
                token
            })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    };
};

export async function updateUserAccount (req: Request, res: Response) {
    try {
        if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.phone_number || !req.body.address || !req.body.state || !req.body.postal_code) {
            res.status(400).json({ 
                success: false, 
                message: "Please enter required fields"
            });
            return;
        };

        const {first_name, last_name, email, phone_number, address, state, postal_code} = req.body;
        const user = await getUserById(req.user.id)
        if ( await checkEmail (email) && ! checkIfEntriesMatch(user.email, email)) {
            res.status(400).send({
                success: false,
                message: "Email already exists"
            })
            return;
        };
        if ( await checkPhoneNumber (phone_number) && ! checkIfEntriesMatch(user.phone_number, phone_number)) {
            res.status(400).send({
                success: false,
                message: "Phone number already exists"
            })
            return;
        };

        await updateUserAccountDetails(req.user.id, first_name, last_name, email, phone_number, address, state, postal_code)
        const updated = await getUserById(req.user.id)
        res.status(200).send({
            success: true,
            message: 'User account details updated', 
            updated
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Error updating user account',
            error: error.message
        });
    };
};

export async function getUserAccount (req: Request, res: Response) {
    try {
        const user = await getUserById(req.user.id);
        if (!user) {
            res.status(400).send({
                success: false,
                message: "Oops! You do not have an account, sign up to continue."
            });
            return;
        };
        res.status(200).send({ 
            success: true,
            user
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Error getting account details',
            error: error.message
        });
    };
};

export async function deleteUserAccount (req: Request, res: Response) {
    try {
        const deletedAccount = await deleteAccount(req.user.id)
        if (deletedAccount === 1) { 
            res.status(200).send({
                success: true,
                message: "Your account has been deleted!"
            })
            return
        }
        res.status(400).send({
            success: false,
            message: "Account does not exist"
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Could not delete your account',
            error: error.message
        });
    }
}