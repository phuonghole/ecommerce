const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    // console.log("🚀 ~ file: auth.js ~ line 5 ~ auth ~ token", token)
    if (!token) return res.status(400).json({ msg: "Invalid Authorization" });
    jwt.verify(token, process.env.ACCESS, (err, user) => {
      if (err) return res.status(400).json({ msg: "Invalid Authorization" });
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
module.exports = auth;
