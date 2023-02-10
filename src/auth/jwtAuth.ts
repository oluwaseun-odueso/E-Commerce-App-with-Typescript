import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import {UserType} from '../functions/userFunctions'
require('dotenv').config();

const secretKey = process.env.PAYLOAD_SECRET as string

if (typeof secretKey === undefined) {
    throw new Error('Missing required environment variable for User Authentication');
    // process.exit(1)
};

function generateToken(payload: UserType): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, {expiresIn: '10m'}, (error, token) => {
            if (error) { 
                reject(error) 
            } else resolve(token as string)
        })
    })
}

async function verifyUserToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).send({
            error: 'Unauthorized'
        });
    }

    try {
        const user = jwt.verify(token, secretKey) as UserType;
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).send({
            error: "Token expired! please login again."
        });
    }
}

const tokenFunctions = {
    generateToken,
    verifyUserToken,
}

export default tokenFunctions;