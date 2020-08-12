const express = require("express");
const router = express.Router();
const privateRoute = require("../middleware/privateRoute");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const {
  check,
  validationResult,
} = require("express-validator");

const User = require("../models/User");

// @ GET /api/auth/logout
// @ remove cookie
// private
router.get("/logout", privateRoute, (req, res) => {
  if (res.statusCode === 200) {
    // res.cookie("jwtCookie", "No Access", {
    //   httpOnly: true,
    // });
    res.clearCookie("jwtCookie");
    res.json({ msg: "logged out" });
  }
  res.statusCode;
  if (res.status === 500) {
    res.json({ msg: "Server Error" });
  }
});

// @ GET /api/auth
// @ get logged users
// private
router.get("/", privateRoute, async (req, res) => {
  try {
    const user = await User.findById(req.user).select(
      "-password"
    );
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

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
      let userData = await User.find({ email }).select(
        "-password"
      );
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
            res.json(userData);
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
