import {Request, Response} from 'express'
import {
    checkIfSellerHasStore,
    checkStoreName,
    createAStore,
    getStoreBySellerId
} from '../functions/storeFunctions'

export async function createStore(req: Request, res: Response) {
    try {
        if ( !req.body.name || !req.body.address ) {
            res.status(400).json({ 
                success: false, 
                message: "Please enter all required fields"
            });
            return;
        };

        const {name, address} = req.body
        if (await checkIfSellerHasStore(req.seller.id)){
            res.status(400).send({message: "You already have a store"})
            return
        };
        if (await checkStoreName(name)){ 
            res.status(400).send({message: "Shop already exists"}) 
            return
        };
        const store = await createAStore(req.seller.id, name, address)
        res.status(201).send({ message : "Store created", store})
    } catch (error: any) {
        res.status(400).send({
            success: false,
            message: "Error creating store",
            error: error.message}) 
    };
};

export async function getAStore(req: Request, res: Response) {
    try {
        const store = await getStoreBySellerId(req.seller.id)
        if ( ! store) {
            res.status(400).send({ message: "Store does not exist" })
            return
        }
        res.status(200).send({success: true, store})
    } catch (error: any) {
        res.status(400).send({
            success: false,
            message: "Error viewing store",
            error: error.message}) 
    }
}
