const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    pseudo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: true})



userSchema.statics.signup = async (pseudo, password) => {

    if (!pseudo || !password) throw Error ('Fill in all the fields please')

    if (pseudo.includes(' ')) throw Error ('Invalid pseudo')

    const exist = await User.findOne({pseudo})

    if (exist) throw Error ('This pseudo is already exist')

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)

    const user = await User.create({pseudo, password: hash})

    return user
}


userSchema.statics.login = async (pseudo, password) => {

    if (!pseudo || !password) throw Error ('Fill in all the fields please')

    const user = await User.findOne({pseudo})

    if (!user) throw Error ('Incorrect pseudo')

    const match = await bcrypt.compare(password, user.password)

    if (!match) throw Error ('Incorrect Password')

    return user
}

const User = mongoose.model('user', userSchema)

module.exports = User