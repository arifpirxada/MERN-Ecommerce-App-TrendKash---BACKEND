const express = require("express")
const router = new express.Router()
const auth = require("../../middleware/auth")
const product = require("../../models/product")
const fs = require("fs")

router.delete("/delete-pro", async (req, res) => {
    try {

        const _id = req.body.id

        var imgData = await product.findById(_id, { img: 1, _id: 0 })
        if (imgData) {
            for (const elem of imgData.img) {
                fs.unlink(`src/img/product/${elem}`, (e) => {
                    if (e) {
                        console.log("Error deleting the file")
                    }
                })
            }
        }

        await product.findByIdAndDelete(_id)
        res.status(200).json({ message: 'Deletion successful' })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = router