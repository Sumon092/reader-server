const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publication_date: {
    type: Date,
    required: true,
  },
  reviews: {
    type: String,
    required: true,
  },
  liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
const Book = mongoose.model("House", bookSchema);
module.exports = Book;
