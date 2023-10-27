const express = require("express");
const router = new express.Router();
const auth = require("../../middleware/auth");
const cat = require("../../models/cat-model");

router.delete("/api/delete-cat", async (req, res) => {
  try {
    const _id = req.body.id;
    await cat.findByIdAndDelete(_id);
    res.status(200).json({ message: "Deletion successful" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
