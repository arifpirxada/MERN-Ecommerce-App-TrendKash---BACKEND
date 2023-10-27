const express = require("express")
const router = new express.Router()
const auth = require("../../middleware/auth")
const fs = require("fs")
const deal = require("../../models/deal")

router.get("/api/read-deal", async (req, res) => {
    try {
        const dealData = await deal.find()
        res.status(200).send(dealData)
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Internal server error" })
    }
})

router.get("/api/read-deal-img/:filename", async (req, res) => {
    try {
        const fileName = req.params.filename
        const imgPath = `src/img/deal/${fileName}`

        fs.access(imgPath, fs.constants.F_OK, (err) => {
            if (err) {
                res.status(404).send('Image not found');
            } else {

                const imageData = fs.createReadStream(imgPath);
                imageData.pipe(res);
            }
        })

    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Internal server error" })
    }
})

module.exports = router