const express = require("express")
const router = new express.Router()
const contact = require("../../models/contact")
const moment = require("moment")
const register = require("../../models/register")

const currentDate = moment()

router.post("/create-contact", async (req, res) => {
    try {
        const user = await register.findById({_id: req.body.uid}, {email: 1, _id: 0})
        const newData = new contact({
            email: user.email,
            message: req.body.message,
            view: 0,
            date: currentDate.format("DD-MM-YYYY HH:mm:ss")
        })

        await newData.save()
        res.status(201).json({ message: "Insertion successful" })
    } catch (e) {
        console.log(e)
        res.status(201).json({ message: "Internal server error" })
    }
})

module.exports = router