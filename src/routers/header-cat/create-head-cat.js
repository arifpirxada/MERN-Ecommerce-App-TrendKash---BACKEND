const express = require("express")
const router = new express.Router()
const auth = require("../../middleware/auth")
const headerCat = require("../../models/header-cat")
const multer = require("multer")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: "./src/img/header-cat",
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage }).single('header-img')

router.post("/api/create-head-cat", async (req, res) => {
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
                    fs.unlink(`src/img/header-cat/${req.file.filename}`, (err) => {
                        if (err) {
                            console.error(`Error deleting file: ${err}`);
                            return;
                        }
                        console.log(`Deleted file: ${req.file.filename}`);
                    })
                    res.status(400).json({ message: 'Unsupported file type.' });
                } else {

                    const catData = req.body
                    const newData = new headerCat({
                        catName: catData.name,
                        catImg: req.file.filename
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