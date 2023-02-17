import express, { Router } from "express";
import { verifySellerToken } from "../auth/jwtAuth";
import { 
    signUpSeller,
    loginSeller,
    updateSellerAccount
} from "../routeControllers/sellerController";
const router: Router = express.Router();


router.post('/signup', signUpSeller)
router.post('/login', loginSeller)
router.put('/update_account', verifySellerToken, updateSellerAccount)

module.exports = router;