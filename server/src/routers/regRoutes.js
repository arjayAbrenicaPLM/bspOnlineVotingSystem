import express from 'express'
import * as regController from '../controllers/regController.js'
import valid from '../middleware/validInfo.js'
import authorize from '../middleware/authorize.js'

const router = express.Router()

// Route for registering new user
router.post('/register', valid, regController.regUser)

// Route for logging in
router.post('/login', valid, regController.logIn)

// Verify user authorization
router.get('/is-verify', authorize, regController.isVerify)

router.post('/changePassword', authorize, regController.changePassword)

export default router