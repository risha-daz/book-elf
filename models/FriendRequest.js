const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  accepted: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("friendrequest", FriendRequestSchema);
