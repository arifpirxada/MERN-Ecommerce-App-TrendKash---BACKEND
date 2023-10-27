const express = require("express");
const router = new express.Router();
const auth = require("../../middleware/auth");
const register = require("../../models/register");

router.get("/api/authorization", auth, async (req, res) => {
  try {
    res.status(200).json({ message: "logged", uid: req.id });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch User ->

router.get("/api/read-user/:id", async (req, res) => {
  try {
    const user = await register.findById(req.params.id, {
      _id: 0,
      password: 0,
      token: 0,
      __v: 0,
    });
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
