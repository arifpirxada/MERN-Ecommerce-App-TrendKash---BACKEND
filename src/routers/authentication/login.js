const express = require("express");
const router = new express.Router();
const register = require("../../models/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/api/login", async (req, res) => {
  try {
    const logData = req.body;
    const user = await register.find({ email: logData.email });

    if (user.length != 0) {
      const passMatch = await bcrypt.compare(logData.pass, user[0].password);
      if (passMatch) {
        const tokenData = {
          token: jwt.sign(
            { id: user[0]._id.toString() },
            process.env.JWT_SECRET_KEY
          ),
        };
        await register.findByIdAndUpdate(user[0]._id, tokenData);

        res.cookie("auth", tokenData.token, {
          expires: new Date(Date.now() + 2 * 7 * 24 * 60 * 60 * 1000),
          httpOnly: true,
          sameSite: "strict",
        });
        res.status(200).json({ message: "Login success" });
      } else {
        res.status(400).json({ message: "Invalid Credentials!" });
      }
    } else {
      res.status(400).json({ message: "Invalid Credentials!" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
