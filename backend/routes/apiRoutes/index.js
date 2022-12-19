const express = require('express')
const contactRouter = require('./contactRouter')
const userRouter = require('./userRouter')
const userMiddleware = require('../../middleware/userMiddleware')



const router = express.Router()

router.use('/user', userRouter)

router.use(userMiddleware)

router.use('/contacts', contactRouter)


module.exports = router
