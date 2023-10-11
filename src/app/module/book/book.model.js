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
  },
  liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  bookOwner: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},
{ timestamps: true });
const Book = mongoose.model("Books", bookSchema);
module.exports = Book;
