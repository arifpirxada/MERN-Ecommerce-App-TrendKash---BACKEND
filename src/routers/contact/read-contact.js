const express = require("express");
const router = new express.Router();
const contact = require("../../models/contact");

router.get("/api/read-contact", async (req, res) => {
  try {
    const contactData = await contact.find();
    res.status(200).send(contactData);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

// For Showing unread message number in admin panel

router.get("/api/read-contact-view", async (req, res) => {
  try {
    const contactData = await contact.countDocuments({ view: 0 });
    res.status(200).json({ unseen: contactData });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
});

module.exports = router;
