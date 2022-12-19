require('dotenv').config()
const jwt = require('jsonwebtoken')


const userMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = verfiyToken(token)
        if (!decoded) return res.status(401).json({error: "Invalid token"})
        next()
    }

    catch (err) {
        return res.status(401).json({error: "Not availble token"})
    }
}

const verfiyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        return decoded
    } catch(err) {
        return
    }
}

module.exports = userMiddleware