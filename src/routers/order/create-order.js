const express = require("express");
const router = new express.Router();
const order = require("../../models/order");
const moment = require("moment");
const cart = require("../../models/cart");
const register = require("../../models/register");

const currentDate = moment();

router.post("/api/create-order", async (req, res) => {
  try {
    const orderData = req.body;
    const payStatus = orderData.paymentType == "cod" ? "success" : "pending";

    const newData = new order({
      products: orderData.products,
      totalPrice: orderData.totalPrice,
      user: orderData.user,
      phone: orderData.phone,
      address: orderData.address,
      shipAddress: orderData.shipAddress,
      date: currentDate.format("DD-MM-YYYY HH:mm:ss"),
      completionDate: "Pending",
      status: "Pending",
      history: [
        {
          status: "Pending",
          date: currentDate.format("DD-MM-YYYY HH:mm:ss"),
        },
      ],
      paymentType: orderData.paymentType,
      notes: orderData.notes,
      paymentStatus: payStatus,
    });

    const delCart = await cart.findOneAndDelete({ uid: orderData.user });

    // Payment Gateway

    if (
      orderData.paymentType === "pay-now" &&
      orderData.paymentType !== "cod"
    ) {
      try {
        const userData = await register.findOne({ _id: orderData.user });
        if (userData) {
          const response = await fetch(
            "https://test.instamojo.com/api/1.1/payment-requests/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Api-Key": process.env.INSTAMOJO_API_KEY,
                "X-Auth-Token": process.env.INSTAMOJO_AUTH_TOKEN,
              },
              body: JSON.stringify({
                purpose: "TrendKash order",
                amount: orderData.totalPrice,
                phone: orderData.phone,
                buyer_name: userData.name,
                redirect_url: "http://localhost:3000/payment-verification", // change to "http://localhost:5173/payment-verification"
                send_email: true,
                send_sms: true,
                email: userData.email,
                allow_repeated_payments: false,
              }),
            }
          );

          const data = await response.json();

          if (
            data &&
            data.payment_request &&
            data.payment_request.id &&
            data.payment_request.longurl
          ) {
            newData.payment_request_id = data.payment_request.id;
            await newData.save();
            return res.status(201).json({
              message: "Redirecting to payment processing...",
              url: data.payment_request.longurl,
            });
          }
        }
      } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Internal server error" });
      }
    }

    // Gateway End

    await newData.save();
    res.status(201).json({ message: "order placed" });
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ message: "Internal server error", error: e.message });
  }
});

module.exports = router;
