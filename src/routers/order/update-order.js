const express = require("express");
const router = new express.Router();
const order = require("../../models/order");
const moment = require("moment");

const currentDate = moment();

router.patch("/update-order", async (req, res) => {
  try {
    const _id = req.body.id;
    await order.findByIdAndUpdate(_id, {
      $set: { status: req.body.status },
      $push: {
        history: {
          status: req.body.status,
          date: currentDate.format("DD-MM-YYYY HH:mm:ss"),
        },
      },
    });
    res.status(200).json({ message: "Updation successful" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/update-order-payment", async (req, res) => {
  try {
    await order.findOneAndUpdate(
      {
        payment_request_id: req.body.payment_request_id,
      },
      req.body
    );
    res.status(200).json({ message: "Updation successful" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
