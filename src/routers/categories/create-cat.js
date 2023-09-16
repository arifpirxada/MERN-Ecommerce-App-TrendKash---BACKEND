const express = require("express")
const router = new express.Router()
const auth = require("../../middleware/auth")
const cat = require("../../models/cat-model")

router.post("/create-cat", async (req, res) => {
    try {
        const catData = req.body
        const newData = new cat({
            catName: catData.name,
            navigation: catData.navi,
            slideTop: catData.slide
        })

        await newData.save()
        res.status(201).json({ message: "Insertion successful" })
    } catch (e) {
        console.log(e)
        res.status(201).json({ message: "Internal server error" })
    }
})

module.exports = router