const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", ".env"),
});

const Auth = (req, res, next) => {
  const token = req.cookies.jwtCookie;
  if (!token) {
    return res.status(400).json({ msg: "No access" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded.id;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ msg: "No access" });
  }
};

module.exports = Auth;
