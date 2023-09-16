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

router.post("/create-pro", (req, res) => {
    try {

        upload(req, res, async (e) => {
            if (e) {
                console.log(e)
                res.status(400).json({ message: "Internal server error, image" })
            } else {
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

                if (imgArr) {

                    const proData = req.body
                    const newData = new product({
                        name: proData.name,
                        desc: proData.desc,
                        details: proData.details,
                        price: proData.price,
                        stock: proData.stock,
                        img: imgArr,
                        brand: proData.brand,
                        ratings: proData.ratings,
                        keywords: proData.keywords,
                        cat: proData.cat
                    })

                    await newData.save()
                    res.status(201).json({ message: "Insertion successful" })
                }

            }
        })

    } catch (e) {
        console.log(e)
        res.status(201).json({ message: "Internal server error" })
    }
})

module.exports = router