import express, { Router } from "express";
import { 
    signUpSeller,
    loginSeller
} from "../routeControllers/sellerController";
const router: Router = express.Router();


router.post('/signup', signUpSeller)
router.post('/login', loginSeller)

module.exports = router;