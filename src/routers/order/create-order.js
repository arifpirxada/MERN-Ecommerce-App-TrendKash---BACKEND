const express = require("express")
const router = new express.Router()
const order = require("../../models/order")
const moment = require("moment")
const cart = require("../../models/cart")

const currentDate = moment()

router.post("/create-order", async (req, res) => {
    try {
        
        const orderData = req.body
        const payStatus = orderData.paymentType == "cod"? "success": "pending"
        const newData = new order({
            products: orderData.products,
            totalPrice: orderData.totalPrice,
            user: orderData.user,
            phone: orderData.phone,
            address: orderData.address,
            shipAddress: orderData.shipAddress,
            date: currentDate.format('DD-MM-YYYY HH:mm:ss'),
            completionDate: "Pending",
            status: "Pending",
            history: [
                {
                    status: "Pending",
                    date: currentDate.format('DD-MM-YYYY HH:mm:ss')
                }
            ],
            paymentType: orderData.paymentType,
            notes: orderData.notes,
            paymentStatus: payStatus
        })

        const delCart = await cart.findOneAndDelete({uid: orderData.user})

        await newData.save()
        res.status(201).json({ message: "order placed" })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: "Internal server error", error: e.message })
    }
})

module.exports = router