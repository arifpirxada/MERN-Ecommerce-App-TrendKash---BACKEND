const mongoose = require("mongoose")


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
        PINCode: {
            type: Number,
            required: true
        }
    }
)

const orderSchema = new mongoose.Schema(
    {
        products: {
            type: [Object],
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
            type: addressSchema,
            required: true
        },
        shipAddress: {
            type: Object
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
        paymentStatus: {
            type: String,
        },
        payment_request_id: {
            type: String
        },
        payment_id: {
            type: String
        },
        notes: {
            type: String
        }
    }
)

const order = new mongoose.model("order", orderSchema)

module.exports = order