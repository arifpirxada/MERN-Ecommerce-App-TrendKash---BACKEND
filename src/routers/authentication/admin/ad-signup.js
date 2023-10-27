const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const adminRegister = require("../../../models/admin-register");

router.post("/api/admin-signup", async (req, res) => {
  try {
    const reqData = req.body;

    const newData = new adminRegister({
      email: reqData.email,
      password: reqData.pass,
    });

    newData.token = jwt.sign(
      { id: newData._id.toString() },
      process.env.JWT_SECRET_KEY
    );

    await newData.save();

    res.cookie("authad", newData.token, {
      expires: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(201).json({ message: "Insertion successful" });
  } catch (e) {
    console.log(e);
    if (e.code === 11000 && e.keyPattern && e.keyPattern.email) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

module.exports = router;
