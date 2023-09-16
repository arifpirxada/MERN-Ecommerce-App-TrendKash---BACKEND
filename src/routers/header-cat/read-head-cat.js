const express = require("express")
const router = new express.Router()
const auth = require("../../middleware/auth")
const headerCat = require("../../models/header-cat")
const fs = require("fs")

router.get("/read-head-cat", async (req, res) => {
    try {
        const catData = await headerCat.find()
        res.status(200).send(catData)
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Internal server error" })
    }
})

router.get("/read-head-img/:filename", async (req, res) => {
    try {
        const fileName = req.params.filename
        const imgPath = `src/img/header-cat/${fileName}`

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