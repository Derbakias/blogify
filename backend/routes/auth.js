const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const {
  check,
  validationResult,
} = require("express-validator");

const User = require("../models/User");

// @ POST /api/auth
// @ login users
// public
router.post(
  "/",
  [
    check("email", "Wrong Credentials").isEmail(),
    check("password", "Wrong Credentials").isLength({
      min: 4,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ msg: "Invalid Credentials" });
      }

      const realUser = await bcrypt.compare(
        password,
        user.password
      );

      if (!realUser) {
        return res
          .status(400)
          .json({ msg: "Invalid Credentials" });
      }

      jwt.sign(
        { id: user._id },
        config.get("jwtSecret"),
        {
          expiresIn: 900,
        },
        (err, token) => {
          if (err) throw err;
          else {
            res.cookie("jwtCookie", token, {
              httpOnly: true,
            });
            res.json({ msg: "You are logged in!" });
          }
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
