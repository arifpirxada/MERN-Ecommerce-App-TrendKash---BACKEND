const mongoose = require("mongoose")

const catSchema = new mongoose.Schema(
    {
        catName: {
            type: String,
            required: true,
            unique: true
        },
        navigation: {
            type: Number,
            required: true,
        },
        slideTop: {
            type: Number,
            required: true
        }
    }
)

const cat = new mongoose.model("categorie", catSchema)

module.exports = cat