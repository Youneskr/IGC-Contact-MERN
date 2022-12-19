require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')

const app = express()

// Connect to DB
mongoose.set('strictQuery', false)

mongoose.connect(process.env.DB_URI)
.then(app.listen(process.env.PORT, () => {
    console.log('ISITCOM GOOGLE CLUB IS HERE !  --  PORT : ',process.env.PORT)
}))


// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(`Path: ${req.path}, Method: ${req.method}`)
    next()
})

// Routes
app.use('/', indexRouter)