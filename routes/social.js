const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const FriendRequest = require("../models/FriendRequest");
const auth = require("../middleware/auth");

router.post("/find", auth, async (req, res) => {
  console.log(req.body.searchparams);
  try {
    const users = await User.find({ email: req.body.searchparams })
      .limit(10)
      .sort({ date: -1 })
      .select("name email avatar");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/requests/to", auth, async (req, res) => {
  try {
    const recs = await FriendRequest.find({ to: req.currentUser.id }).sort({
      date: -1,
    });
    res.json(recs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.get("/requests/from", auth, async (req, res) => {
  try {
    const recs = await FriendRequest.find({ from: req.currentUser.id }).sort({
      date: -1,
    });
    res.json(recs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/requests",
  [auth, check("to", "No user found").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { to } = req.body;
    try {
      const newRequest = new FriendRequest({
        from: req.currentUser.id,
        to: to,
      });
      const request = await newRequest.save();
      res.json(request);
    } catch (err) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

router.delete("/requests/:id", auth, async (req, res) => {
  try {
    let request = await FriendRequest.findById(req.params.id);

    if (!request)
      return res.status(404).json({ msg: "Not a valid friend request" });

    if (req.currentUser.id !== request.from.toString()) {
      res.status(401).send("Not authorised");
    }

    request = await FriendRequest.findByIdAndRemove(req.params.id);

    res.json({ msg: "request deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
