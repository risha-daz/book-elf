const express = require("express");
const router = express.Router();

// @route   GET ./api/books/
// @desc    Get books
// @access  private
router.get("/", (req, res) => {
  res.send("Get books");
});

// @route   POST ./api/books/
// @desc    add a book
// @access  private
router.get("/", (req, res) => {
  res.send("Add book");
});

// @route   PUT ./api/books/:id
// @desc    update a book
// @access  private
router.put("/:id", (req, res) => {
  res.send("Update book provided id");
});

// @route   DELETE ./api/books/:id
// @desc    update a book
// @access  private
router.delete("/:id", (req, res) => {
  res.send("Update book provided id");
});

module.exports = router;
