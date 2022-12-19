const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
    sponsor: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    img: String,
    num: String,
    res: String,
    address: String,
    note: String,
    favorite: Boolean
}, {timestamps: true})

const Contact = mongoose.model('contact', contactSchema)

module.exports = Contact