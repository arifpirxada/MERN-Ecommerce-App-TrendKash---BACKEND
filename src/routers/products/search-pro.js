const express = require("express");
const router = new express.Router();
const product = require("../../models/product");

router.get("/search-pro/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const proData = await product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { desc: { $regex: query, $options: "i" } },
        { keywords: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).send(proData);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

router.get("/search-suggest/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const proData = await product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { desc: { $regex: query, $options: "i" } },
        { keywords: { $regex: query, $options: "i" } },
      ],
    }, {
      name: 1,
      _id: 0
    }).limit(10);

    res.status(200).send(proData);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

module.exports = router;
