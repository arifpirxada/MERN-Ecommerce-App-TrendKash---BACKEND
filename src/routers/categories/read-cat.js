const express = require("express")
const router = new express.Router()
const cat = require("../../models/cat-model")
const auth = require("../../middleware/auth")

router.get("/cat-read-admin", async (req, res) => {
    try {
        const catData = await cat.find()
        res.status(200).send(catData)
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Internal server error" })
    }
})

router.get("/cat-read-navi", async (req, res) => {
    try {
        const catData = await cat.find({ navigation: 1 }, { _id: 0, __v: 0, navigation: 0, slideTop: 0, groupSlider: 0 })
        res.status(200).send(catData)
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Internal server error" })
    }
})

router.get("/cat-read-slide", async (req, res) => {
    try {
        const catData = await cat.find({ slideTop: 1 }, { _id: 0, __v: 0, navigation: 0, slideTop: 0, groupSlider: 0 })
        res.status(200).send(catData)
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Internal server error" })
    }
})

router.get("/cat-read-group-slider", async (req, res) => {
    try {
        const catData = await cat.find({ groupSlider: 1 }, { _id: 0, __v: 0, navigation: 0, slideTop: 0, groupSlider: 0 })
        res.status(200).send(catData)
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Internal server error" })
    }
})

module.exports = router