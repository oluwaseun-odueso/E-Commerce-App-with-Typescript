import express, { Router } from 'express';
import { verifySellerToken } from '../auth/jwtAuth';
const router: Router  = express.Router()

import {
    createStore
} from "../routeControllers/storeController";

router.post('/create', verifySellerToken, createStore);

module.exports = router;