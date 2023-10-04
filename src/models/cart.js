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
        },
        expires_at: {
            type: Date,
            default: function () {
                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + 7);
                return currentDate;
              }
        }
    }
)

const cart = new mongoose.model("cart", cartSchema)

module.exports = cart