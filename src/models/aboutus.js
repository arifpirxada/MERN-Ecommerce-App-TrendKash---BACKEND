const mongoose = require("mongoose")

const aboutSchema = new mongoose.Schema(
    {
        email: {
            type: String
        },
        phone: {
            type: Number
        },
        address: {
            type: String
        },
        aboutUs: {
            type: String
        }
    }
)

const about = new mongoose.model("about", aboutSchema)

module.exports = about