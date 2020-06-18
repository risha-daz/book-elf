const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const https = require("https");
const dotenv = require("dotenv");
// @route   GET ./api/google/
// @desc    register a user
// @access  public
router.post(
  "/",
  [check("title", "Please enter a title").not().isEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ msg: "Please enter a parameter (title,author etc)" });
    }

    https
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${req.body.title}&orderBy=relevance&maxResults=1&key=${process.env.GOOGLE_API_KEY}`,
        (resp) => {
          let data = "";

          // A chunk of data has been recieved.
          resp.on("data", (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            res.status(200).send(data);
          });
        }
      )
      .on("error", (err) => {
        console.log("Error: " + err.message);
        res.status(500).send(err);
      });
  }
);

module.exports = router;
