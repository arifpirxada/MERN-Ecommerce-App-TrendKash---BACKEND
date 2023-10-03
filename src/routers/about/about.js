const express = require("express")
const router = new express.Router()
const about = require("../../models/aboutus")

router.post("/create-about", async (req, res) => {
    try {
        const aboutData = req.body
        const newData = new about({
            email: aboutData.email,
            phone: aboutData.phone,
            address: aboutData.address,
            aboutUs: aboutData.aboutUs
        })

        await newData.save()
        res.status(201).json({ message: "Insertion successful" })
    } catch (e) {
        console.log(e)
        res.status(201).json({ message: "Internal server error" })
    }
})

router.patch("/update-about", async (req, res) => {
    try {
        const _id = req.body.id
        await about.findByIdAndUpdate(_id, req.body)
        res.status(201).json({ message: 'Updation successful' })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.get("/read-about", async (req, res) => {
    try {
        const catData = await about.find()
        res.status(200).send(catData)
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Internal server error" })
    }
})

module.exports = router