const express = require('express')
const { signup, login, logout, me} = require('../controller/auth.controller.js')
const protect = require('../middleware/auth.middleware.js')


const router = express.Router()


router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.get('/me',protect,me)


module.exports = router;