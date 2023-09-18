const express = require("express")
const router = new express.Router()
const contact = require("../../models/contact")

router.get("/read-contact", async (req, res) => {
    try {
        const contactData = await contact.find()
        res.status(200).send(contactData)
    } catch (e) {
        console.log(e);
        res.status(400).json({message: "Internal server error"})
    }
})

module.exports = router