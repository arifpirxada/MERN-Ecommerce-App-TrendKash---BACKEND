const express = require("express");
const router = new express.Router();
const contact = require("../../models/contact");

router.delete("/api/delete-contact", async (req, res) => {
  try {
    const _id = req.body.id;
    await contact.findByIdAndDelete(_id);
    res.status(200).json({ message: "Deletion successful" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
