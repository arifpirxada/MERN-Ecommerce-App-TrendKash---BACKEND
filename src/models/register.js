const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const registerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
        },
        token: {
            type: String
        }
    }
)

registerSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const register = new mongoose.model("kashuser", registerSchema)

module.exports = register