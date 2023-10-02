const express = require("express")
const router = new express.Router()
const order = require("../../models/order")

router.get("/read-order", async (req, res) => {
    try {
        const orderData = await order.find().sort({_id: -1})
        res.status(200).send(orderData)
    } catch (e) {
        console.log(e);
        res.status(400).json({message: "Internal server error"})
    }
})

router.get("/read-order-half/:uid", async (req, res) => {
    try {
        const uid = req.params.uid
        const orderData = await order.find({user: uid},{phone: 0, completionDate: 0, history: 0, transactionId: 0, paymentAuth: 0, notes: 0, __v: 0, user: 0}).sort({_id: -1})
        res.status(200).send(orderData)
    } catch (e) {
        console.log(e);
        res.status(400).json({message: "Internal server error"})
    }
})

router.get("/read-order-count", async (req, res) => {
    try {
        const orderCount = await order.find({status: "Pending"}).count()
        res.status(200).send({count: orderCount})
    } catch (e) {
        console.log(e);
        res.status(400).json({message: "Internal server error"})
    }
})

router.get("/read-order-filter/:status", async (req, res) => {
    try {
        const status = req.params.status
        const filterData = await order.find({status})
        res.status(200).send(filterData)
    } catch (e) {
        console.log(e);
        res.status(400).json({message: "Internal server error"})
    }
})

module.exports = router