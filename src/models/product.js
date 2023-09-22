const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        desc: {
            type: String
        },
        details: {
            type: [Object],
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        img: {
            type: [String],
            required: true
        },
        brand: {
            type: String,
        },
        ratings: {
            type: [Object]
        },
        keywords: {
            type: [String]
        },
        cat: {
            type: [String]
        },
        size: {
            type: [String]
        },
        color: {
            type: [String]
        },
        disPercentage: {
            type: Number
        },
        oldPrice: {
            type: Number
        }
    }
)

const product = new mongoose.model("product", productSchema)

module.exports = product