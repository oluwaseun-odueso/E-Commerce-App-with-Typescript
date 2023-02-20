"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtAuth_1 = require("../auth/jwtAuth");
const router = express_1.default.Router();
const storeController_1 = require("../routeControllers/storeController");
router.post('/create', jwtAuth_1.verifySellerToken, storeController_1.createStore);
router.get('/getStore', jwtAuth_1.verifySellerToken, storeController_1.getAStore);
router.put('/updateStore', jwtAuth_1.verifySellerToken, storeController_1.updateStore);
module.exports = router;
