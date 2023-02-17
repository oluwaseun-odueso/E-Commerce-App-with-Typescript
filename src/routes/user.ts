import express, { Router } from 'express'
import { verifyUserToken } from '../auth/jwtAuth'
const router: Router = express.Router()

import {
    signUpUser,
    loginUser,
    updateUserAccount,
    getUserAccount,
    deleteUserAccount
} from "../routeControllers/userController"

router.post('/signup', signUpUser)
router.post('/login', loginUser)
router.put('/update_account', verifyUserToken, updateUserAccount)
router.get('/get_account', verifyUserToken, getUserAccount)
router.delete('/delete_account', verifyUserToken, deleteUserAccount)

module.exports = router