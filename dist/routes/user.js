"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtAuth_1 = require("../auth/jwtAuth");
const router = express_1.default.Router();
const userController_1 = require("../routeControllers/userController");
router.post('/signup', userController_1.signUpUser);
router.post('/login', userController_1.loginUser);
router.put('/update_account', jwtAuth_1.verifyUserToken, userController_1.updateUserAccount);
module.exports = router;
