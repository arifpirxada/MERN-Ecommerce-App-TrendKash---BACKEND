const express = require("express");
const router = new express.Router();
const auth = require("../../middleware/auth");
const order = require("../../models/order");

router.delete("/api/delete-order", async (req, res) => {
  try {
    const _id = req.body.id;
    await order.findByIdAndDelete(_id);
    res.status(200).json({ message: "Deletion successful" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
