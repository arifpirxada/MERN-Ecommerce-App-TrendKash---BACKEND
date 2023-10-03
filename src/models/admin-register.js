const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const adminRegisterSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        token: {
            type: String
        }
    }
)

adminRegisterSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const adminRegister = new mongoose.model("adminuser", adminRegisterSchema)

module.exports = adminRegister