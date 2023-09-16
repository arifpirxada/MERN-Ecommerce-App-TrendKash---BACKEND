const express = require("express")
const router = new express.Router()
const auth = require("../../middleware/auth")
const headerCat = require("../../models/header-cat")
const fs = require("fs")

router.delete("/delete-head-cat", async (req, res) => {
    try {
        const _id = req.body.id
        const image = await headerCat.findById(_id, {catImg: 1, _id: 0})
        fs.unlink(`src/img/header-cat/${image.catImg}`, async (err) => {
            if (err) {
                console.error(`Error deleting file: ${err}`);
                return;
            } else {
                await headerCat.findByIdAndDelete(_id)
                res.status(200).json({ message: 'Deletion successful' })
            }
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = router