const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  genre: {
    type: String,
  },
  read: {
    type: String,
    default: "Not Read",
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
  },
  recommendedto: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "users",
  },
  recommendedby: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "users",
  },
  cover: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("book", BookSchema);
