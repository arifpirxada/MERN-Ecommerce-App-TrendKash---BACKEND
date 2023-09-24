const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true
        },
        products: {
            type: [Object],
            required: true,
        }
    }
)

const cart = new mongoose.model("cart", cartSchema)

module.exports = cart