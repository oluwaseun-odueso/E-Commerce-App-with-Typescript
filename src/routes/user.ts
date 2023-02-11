import express, { Router } from 'express'
const router: Router = express.Router()

import {
    signUpUser
} from "../routeControllers/userController"

router.post('/signup', signUpUser)

module.exports = router