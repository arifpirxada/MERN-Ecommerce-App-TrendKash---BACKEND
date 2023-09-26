const express = require("express")
const router = new express.Router()
const auth = require("../../middleware/auth")
const multer = require("multer")
const fs = require("fs")
const deal = require("../../models/deal")

const storage = multer.diskStorage({
    destination: "./src/img/deal",
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage }).single('deal-img')

router.post("/create-deal", async (req, res) => {
    try {
        upload(req, res, async (e) => {
            if (e) {
                console.log(e)
                res.status(400).json({ message: "Internal server error, image" })
            } else {
                const contentTypeMap = {
                    png: 'image/png',
                    jpeg: 'image/jpeg',
                    jpg: 'image/jpeg',
                    webp: 'image/webp'
                };

                const fileExtension = req.file.filename.split('.').pop().toLowerCase();

                if (!contentTypeMap[fileExtension]) {
                    fs.unlink(`src/img/deal/${req.file.filename}`, (err) => {
                        if (err) {
                            console.error(`Error deleting file: ${err}`);
                            return;
                        }
                        console.log(`Deleted file: ${req.file.filename}`);
                    })
                    res.status(400).json({ message: 'Unsupported file type.' });
                } else {

                    const newData = new deal({
                        name: req.body.name,
                        img: req.file.filename,
                        offer: req.body.offer,
                        endDate: req.body.endDate,
                        cat: req.body.cat
                    })

                    try {
                        await newData.save()
                        res.status(201).json({ message: "Insertion successful" })
                    } catch (e) {
                        res.status(400).json({ message: "Internal server error", error: e.message })
                    }
                }
            }
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: "Internal server error", error: e.message })
    }
})

module.exports = router