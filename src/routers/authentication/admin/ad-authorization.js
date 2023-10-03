const express = require("express");
const router = new express.Router();
const adminRegister = require("../../../models/admin-register");
const adminAuth = require("../../../middleware/admin-auth");

router.get("/admin-authorization", adminAuth, async (req, res) => {
  try {
    res.status(200).json({ message: "logged" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch User ->

router.get("/read-admin-users", async (req, res) => {
  try {
    const adminUsers = await adminRegister.find({}, {
      password: 0,
      token: 0,
      __v: 0,
    });
    res.status(200).json(adminUsers);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
