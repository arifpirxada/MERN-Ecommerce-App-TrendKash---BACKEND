const mongoose = require("mongoose")

const dealSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        offer: {
            type: String,
            required: true
        },
        endDate: {
            type: String,
            required: true
        },
        cat: {
            type: String,
            required: true
        }
    }
)

const deal = new mongoose.model("deal", dealSchema)

module.exports = deal