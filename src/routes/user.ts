import express, { Router } from 'express'
const router: Router = express.Router()

import {
    signUpUser,
    loginUser
} from "../routeControllers/userController"

router.post('/signup', signUpUser)
router.post('/login', loginUser)

module.exports = router