const express = require('express')
const { loginUser, signupUser, isLogin } = require('../../controllers/api/userController')


const router = express.Router()

router.post('/login', loginUser)
router.post('/signup', signupUser)
router.post('/islogin', isLogin)

module.exports = router
