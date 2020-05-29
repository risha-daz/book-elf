const express = require("express");
const router = express.Router();

// @route   GET ./api/auth/
// @desc    get the logged in user
// @access  private??
router.get("/", (req, res) => {
  res.send("get the current user");
});

// @route   POST ./api/users/
// @desc    user is logged in
// @access  public
router.post("/", (req, res) => {
  res.send("User logs in");
});
module.exports = router;
