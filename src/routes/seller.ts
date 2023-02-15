import express, { Router } from "express";
const router: Router = express.Router();

import { signUpSeller } from "../routeControllers/sellerController";

router.post('/signup', signUpSeller)

module.exports = router;