const express = require('express')
const apiRouter = require('./apiRoutes/index')


const router = express.Router()


router.use('/api', apiRouter)

module.exports = router 
