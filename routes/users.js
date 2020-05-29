const express = require("express");
const router = express.Router();

// @route   GET ./api/users/
// @desc    register a user
// @access  public
router.get("/", (req, res) => {
  res.send("User registers");
});

module.exports = router;
