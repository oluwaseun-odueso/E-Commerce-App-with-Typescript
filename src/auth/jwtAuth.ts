import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import {UserType} from '../functions/userFunctions'
import { User } from "../types/custom";
import {SellerType} from '../functions/sellerFunctions'
import {Seller} from '../types/custom'
require('dotenv').config();

const secretKey = process.env.PAYLOAD_SECRET as string

if (!secretKey) {
    throw new Error('Missing required environment variable for User Authentication');
};

export function generateUserToken(payload: UserType): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, {expiresIn: '10m'}, (error, token) => {
            if (error) { 
                reject(error) 
            } else resolve(token as string)
        })
    })
}

export async function verifyUserToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).send({
            error: 'Unauthorized'
        });
    }

    try {
        const user = jwt.verify(token, secretKey) as User;
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).send({
            error: "Token expired! please login again."
        });
    }
}

export function generateSellerToken(payload: SellerType): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, {expiresIn: '10m'}, (error, token) => {
            if (error) { 
                reject(error) 
            } else resolve(token as string)
        })
    })
}

export async function verifySellerToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).send({
            error: 'Unauthorized'
        });
    }

    try {
        const seller = jwt.verify(token, secretKey) as Seller;
        req.seller = seller;
        next();
    } catch (error) {
        return res.status(403).send({
            error: "Token expired! please login again."
        });
    }
}