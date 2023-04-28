import express, { Router } from 'express';
import { verifySellerToken } from '../auth/jwtAuth';
const router: Router  = express.Router()

import {
    createStore, 
    deleteStore, 
    getAStore, 
    updateStore
} from "../controllers/storeController";

router.post('/create', verifySellerToken, createStore);
router.get('/getStore', verifySellerToken, getAStore);
router.put('/updateStore', verifySellerToken, updateStore)
router.delete('/deleteStore', verifySellerToken, deleteStore)

module.exports = router;