const express = require("express")
const router = new express.Router()
const auth = require("../../middleware/auth")
const product = require("../../models/product")

const multer = require("multer")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: "./src/img/product",
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage }).array('photos', 4)

// Script for updating product images

router.post("/update-pro-img", async (req, res) => {
    try {
        upload(req, res, async (e) => {
            if (e) {
                console.log(e)
                res.status(400).json({ message: "Internal server error, image" })
            } else {

                // For deleting the existing product images
                var imgData = await product.findById(req.body.id, { img: 1, _id: 0 })
                console.log(imgData)
                if (imgData) {
                    for (const elem of imgData.img) {
                        fs.unlink(`src/img/product/${elem}`, (e) => {
                            if (e) {
                                console.log("Error deleting the file")
                            }
                        })
                    }
                }

                const fileTypes = [
                    'image/png',
                    'image/jpeg',
                    'image/jpeg',
                    'image/webp'
                ];

                var imgArr = []

                for (const element of req.files) {
                    if (!fileTypes.includes(element.mimetype.toLowerCase())) {

                        req.files.forEach(elem => {
                            fs.unlink(`src/img/product/${elem.filename}`, (err) => {
                                if (err) {
                                    console.error(`Error deleting file: ${err}`);
                                }
                            })
                        });
                        imgArr = null
                        res.status(400).json({ message: 'Unsupported file type.' });
                        break;
                    } else {
                        imgArr.push(element.filename)
                    }
                };

                const imgObj = {
                    img: imgArr
                }

                if (imgArr) {
                    await product.findByIdAndUpdate(req.body.id, imgObj)
                    res.status(201).json({ message: "Insertion successful" })
                }

            }
        })

    } catch (e) {
        console.log(e)
        res.status(400).json({ message: "Internal server error" })
    }
})

router.patch("/update-pro", async (req, res) => {
    try {
        const _id = req.body.id
        await product.findByIdAndUpdate(_id, req.body)
        res.status(201).json({ message: 'Updation successful' })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Internal server error' })
    }
})



module.exports = router