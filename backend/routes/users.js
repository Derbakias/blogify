const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const {
  check,
  validationResult,
} = require("express-validator");

const User = require("../models/User");

router.get("/", (req, res) => {
  res.send("users router");
});

// @ POST /api/users
// @ register users
// public
router.post(
  "/",
  [
    check("username", "Username is required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please enter a password of 6 or more characters"
    )
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: errors.array() });
    }
    const { username, password, email } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          msg: "User already exists. Please log in",
        });
      }
      user = new User({
        username,
        password,
        email,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.status(200).json({ msg: "User registered!" });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
