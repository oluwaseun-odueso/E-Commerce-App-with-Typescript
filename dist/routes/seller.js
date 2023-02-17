"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtAuth_1 = require("../auth/jwtAuth");
const sellerController_1 = require("../routeControllers/sellerController");
const router = express_1.default.Router();
router.post('/signup', sellerController_1.signUpSeller);
router.post('/login', sellerController_1.loginSeller);
router.put('/update_account', jwtAuth_1.verifySellerToken, sellerController_1.updateSellerAccount);
router.get('/get_account', jwtAuth_1.verifySellerToken, sellerController_1.getSellerAccount);
router.delete('/delete_account', jwtAuth_1.verifySellerToken, sellerController_1.deleteAccount);
module.exports = router;
