const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        details: {
            type: [Object],
            required: true
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
            required: true
        },
        ratings: {
            type: [Object]
        },
        keywords: {
            type: [String]
        }, 
        cat: {
            type: [String]
        }
    }
)

const product = new mongoose.model("product", productSchema)

module.exports = product