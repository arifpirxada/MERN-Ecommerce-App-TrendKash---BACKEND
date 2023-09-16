const mongoose = require("mongoose")

const headerCatSchema = new mongoose.Schema(
    {
        catName: {
            type: String,
            required: true,
            unique: true
        },
        catImg: {
            type: String,
            required: true
        }
    }
)

const headerCat = new mongoose.model("headercat", headerCatSchema)

module.exports = headerCat