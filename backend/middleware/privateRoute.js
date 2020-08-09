const jwt = require("jsonwebtoken");
const config = require("config");

const Auth = (req, res, next) => {
  const token = req.cookies.jwtCookie;
  if (!token) {
    return res.status(400).json({ msg: "No access" });
  }

  try {
    const decoded = jwt.verify(
      token,
      config.get("jwtSecret")
    );

    req.user = decoded.id;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ msg: "No access" });
  }
};

module.exports = Auth;
