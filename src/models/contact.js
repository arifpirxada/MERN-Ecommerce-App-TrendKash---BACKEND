const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    view: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

const contact = new mongoose.model("contact", contactSchema)

module.exports = contact