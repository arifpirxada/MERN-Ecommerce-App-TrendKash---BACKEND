const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        qty: {
            type: Number,
            required: true
        }
    }
)

const addressSchema = new mongoose.Schema(
    {
        street: {
            type: String,
            required: true
        },
        locality: {
            type: String,
            required: true
        },
        region: {
            type: String,
            required: true
        },
        ZIPCode: {
            type: Number,
            required: true
        }
    }
)

const orderSchema = new mongoose.Schema(
    {
        products: {
            // contains id, price & quantity of products
            type: [productSchema],
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        user: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        address: {
            type: [addressSchema],
            required: true
        },
        shipAddress: {
            type: [Object]
        },
        date: {
            type: String,
            required: true
        },
        completionDate: {
            type: String
        },
        status: {
            type: String,
            required: true
        },
        history: {
            // contains status change logs & their timings
            type: [Object]
        },
        paymentType: {
            type: String,
            required: true
        },
        transactionId: {
            type: String
        },
        paymentAuth: {
            type: String
        }
    }
)

const order = new mongoose.model("order", orderSchema)

module.exports = order