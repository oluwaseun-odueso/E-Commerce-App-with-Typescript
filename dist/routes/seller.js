"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sellerController_1 = require("../routeControllers/sellerController");
const router = express_1.default.Router();
router.post('/signup', sellerController_1.signUpSeller);
router.post('/login', sellerController_1.loginSeller);
module.exports = router;
