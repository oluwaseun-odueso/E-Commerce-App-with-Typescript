import express, { Router } from 'express';
import { verifySellerToken } from '../auth/jwtAuth';
const router: Router  = express.Router()

import {
    createStore, getAStore
} from "../routeControllers/storeController";

router.post('/create', verifySellerToken, createStore);
router.get('/getStore', verifySellerToken, getAStore)

module.exports = router;