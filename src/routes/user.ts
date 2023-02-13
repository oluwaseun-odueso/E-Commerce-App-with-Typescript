import express, { Router } from 'express'
import { verifyUserToken } from '../auth/jwtAuth'
const router: Router = express.Router()

import {
    signUpUser,
    loginUser,
    updateUserAccount
} from "../routeControllers/userController"

router.post('/signup', signUpUser)
router.post('/login', loginUser)
router.put('/update_account', verifyUserToken, updateUserAccount)

module.exports = router