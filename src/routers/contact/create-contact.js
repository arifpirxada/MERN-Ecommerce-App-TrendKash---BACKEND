const express = require("express")
const router = new express.Router()
const contact = require("../../models/contact")

router.post("/create-contact", async (req, res) => {
    try {
        const contactData = req.body
        const newData = new contact({
            email: contactData.email,
            message: contactData.message
        })

        await newData.save()
        res.status(201).json({ message: "Insertion successful" })
    } catch (e) {
        console.log(e)
        res.status(201).json({ message: "Internal server error" })
    }
})

module.exports = router