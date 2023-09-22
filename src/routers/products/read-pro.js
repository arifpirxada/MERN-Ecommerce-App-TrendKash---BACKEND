const express = require("express")
const router = new express.Router()
const product = require("../../models/product")
const auth = require("../../middleware/auth")
const fs = require("fs")

router.get("/read-pro/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const proData = await product.findById(_id)
        res.status(200).send(proData)
    } catch (e) {
        console.log(e);
        res.status(400).json({message: "Internal server error"})
    }
})

router.get("/read-pro-half", async (req, res) => {
    try {
        const proData = await product.find({},{name: 1,desc: 1, img: 1, price: 1, ratings: 1, oldPrice: 1, disPercentage: 1}).sort({ _id: -1 })
        res.status(200).send(proData)
    } catch (e) {
        console.log(e);
        res.status(400).json({message: "Internal server error"})
    }
})

router.get("/read-pro-img/:filename", async (req, res) => {
    try {
        const fileName = req.params.filename
        const imgPath = `src/img/product/${fileName}`

        fs.access(imgPath, fs.constants.F_OK, (err) => {
            if (err) {
                res.status(404).json({ message: "Image not found" })
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

router.get("/read-pro-cat/:category", async (req, res) => {
    try {
        const category = req.params.category
        const proData = await product.find({cat: category},{name: 1,desc: 1, img: 1, price: 1, ratings: 1, oldPrice: 1, disPercentage: 1}).sort({ _id: -1 })
        res.status(200).send(proData)
    } catch (e) {
        console.log(e);
        res.status(400).json({message: "Internal server error"})
    }
})

module.exports = router