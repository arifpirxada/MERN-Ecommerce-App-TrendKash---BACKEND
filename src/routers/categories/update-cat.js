const express = require("express");
const router = new express.Router();
const auth = require("../../middleware/auth");
const cat = require("../../models/cat-model");

router.patch("/api/update-cat", async (req, res) => {
  try {
    const _id = req.body.id;
    await cat.findByIdAndUpdate(_id, req.body);
    res.status(201).json({ message: "Updation successful" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
