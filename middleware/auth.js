const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    req.currentUser = jwt.verify(token, config.get("jwtsecret")).currentUser;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "wrong token, authorization denied" });
  }
};
