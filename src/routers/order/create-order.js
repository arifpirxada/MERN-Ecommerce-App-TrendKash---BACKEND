const express = require("express")
const router = new express.Router()
const auth = require("../../middleware/auth")
const order = require("../../models/order")
const moment = require("moment")

const currentDate = moment()

router.post("/create-order", async (req, res) => {
    try {
        
        const orderData = req.body
        const newData = new order({
            products: orderData.products,
            totalPrice: orderData.totalPrice,
            user: orderData.user,
            phone: orderData.phone,
            address: orderData.address,
            shipAddress: orderData.shipAddress,
            date: currentDate.format('DD-MM-YYYY HH:mm:ss'),
            completionDate: "Pending",
            status: "Processing",
            history: [
                {
                    status: "Processing",
                    date: currentDate.format('DD-MM-YYYY HH:mm:ss')
                }
            ],
            paymentType: orderData.paymentType
        })

        await newData.save()
        res.status(201).json({ message: "Insertion successful" })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: "Internal server error", error: e.message })
    }
})

module.exports = router