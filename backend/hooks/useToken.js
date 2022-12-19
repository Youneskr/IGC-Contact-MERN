require('dotenv').config()
const jwt = require('jsonwebtoken')

// Create Token
const createToken = (_id, pseudo) => {
    return jwt.sign({_id, pseudo}, process.env.SECRET, {expiresIn: '3d'})
}

// Verify Token
const verfiyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        return decoded
    } catch(err) {
        return
    }
}

module.exports = { createToken, verfiyToken }