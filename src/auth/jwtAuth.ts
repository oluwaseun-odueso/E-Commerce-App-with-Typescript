import {Request, Response, NextFunction} from "express";
import jwt,  {JwtPayload, Secret} from 'jsonwebtoken';
require('dotenv').config();

const secret: Secret = ""

// export interface CustomRequest extends Request {
//     token: string | JwtPayload;
// }

function generateToken(payload: JwtPayload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, {expiresIn: '10m'}, (error, token) => {
            if (error) reject(error)
            resolve(token)
        })
    })
}

function verifyUserToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, secret, function(err, user) {
        if (err) return res.status(403).send({
            errno : 100,
            message: "Token expired! please login again."
        })
        req.user = user
        next()
    })
}

function verifySellerToken(req: Request, res: Response, next:NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, secret, function(err, seller) {
        if (err) return res.status(403).send({
            errno : 100,
            message: "Token expired! please login again."
        })
        req.seller = seller
        next()
    })
}

const tokenFunctions = {
    generateToken,
    verifyUserToken,
    verifySellerToken
}

module.exports = tokenFunctions