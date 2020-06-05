const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Book = require("../models/Book");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

// @route   GET ./api/books/
// @desc    Get books
// @access  private
router.get("/", auth, async (req, res) => {
  try {
    const books = await Book.find({ user: req.currentUser.id }).sort({
      date: -1,
    });
    res.json(books);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

// @route   POST ./api/books/
// @desc    add a book
// @access  private
router.post(
  "/",
  [auth, [check("title", "Please enter a title").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, author, genre, read, description, rating } = req.body;
    try {
      const newBook = new Book({
        user: req.currentUser.id,
        title,
        author,
        genre,
        read,
        description,
        rating,
      });
      console.log("object");
      const book = await newBook.save();
      res.json(book);
    } catch (err) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   PUT ./api/books/:id
// @desc    update a book
// @access  private
router.put("/:id", auth, async (req, res) => {
  const { title, author, genre, read, description, rating } = req.body;
  console.log(req.body);
  let updates = {};
  if (title) updates.title = title;
  if (author) updates.author = author;
  if (genre) updates.genre = genre;
  if (description) updates.description = description;
  if (rating) updates.rating = rating;
  if (read.toString()) updates.read = read;

  try {
    let book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ msg: "book does not exist" });

    if (req.currentUser.id !== book.user.toString()) {
      res.status(401).send("Not authorised");
    }

    book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE ./api/books/:id
// @desc    update a book
// @access  private
router.delete("/:id", auth, async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ msg: "book does not exist" });

    if (req.currentUser.id !== book.user.toString()) {
      res.status(401).send("Not authorised");
    }

    book = await Book.findByIdAndRemove(req.params.id);

    res.json({ msg: "book deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
