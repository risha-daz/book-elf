const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");
const User = require("../models/User");
const auth = require("../middleware/auth");

// @route   GET ./api/auth/
// @desc    get the logged in user
// @access  private??
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.currentUser.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST ./api/users/
// @desc    user is logging in
// @access  public
router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter the password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: "Please enter a valid email" });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ msg: "User does not exist" });
      }
      isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ msg: "Incorrect password" });
      }
      const payload = {
        currentUser: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtsecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
