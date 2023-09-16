const express = require("express")
const router = new express.Router()
const auth = require("../../middleware/auth")
const deal = require("../../models/deal")
const fs = require("fs")

router.delete("/delete-deal", async (req, res) => {
    try {
        const _id = req.body.id
        const image = await deal.findById(_id, {img: 1, _id: 0})
        fs.unlink(`src/img/deal/${image.img}`, async (err) => {
            if (err) {
                console.error(`Error deleting file: ${err}`);
                return;
            } else {
                await deal.findByIdAndDelete(_id)
                res.status(200).json({ message: 'Deletion successful' })
            }
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = router