const express = require("express");
const router = new express.Router();
const adminRegister = require("../../../models/admin-register");
const adminAuth = require("../../../middleware/admin-auth");

router.get("/admin-logout", adminAuth, async (req, res) => {
  try {
    res.clearCookie("authad");
    await adminRegister.findByIdAndUpdate(
      { _id: req.id },
      { $set: { token: "" } }
    );
    res.status(200).json({ message: "Logout successful" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
})

router.delete("/admin-user-delete", async (req, res) => {
  try {
    const _id = req.body.id
    await adminRegister.findByIdAndDelete(
      { _id }
    );
    res.status(200).json({ message: "Deletion successful" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Internal server error" });
  }
})

module.exports = router;
