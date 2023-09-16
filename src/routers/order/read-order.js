const express = require("express")
const router = new express.Router()
const auth = require("../../middleware/auth")
const order = require("../../models/order")

router.get("/read-order", async (req, res) => {
    try {
        const orderData = await order.find()
        res.status(200).send(orderData)
    } catch (e) {
        console.log(e);
        res.status(400).json({message: "Internal server error"})
    }
})

router.get("/read-order-half", async (req, res) => {
    try {
        const orderData = await order.find({},{phone: 0, shipAddress: 0, completionDate: 0, history: 0, transactionId: 0, paymentAuth: 0})
        res.status(200).send(orderData)
    } catch (e) {
        console.log(e);
        res.status(400).json({message: "Internal server error"})
    }
})

module.exports = router