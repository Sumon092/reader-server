const bookService = require("./book.services.js");
const mongoose = require("mongoose");
const addBook = async (req, res) => {
  try {
    const bookData = req.body;
    const ownerId = req.user.email;
    console.log(ownerId, "controller owner id");
    // const objectId = new mongoose.Types.ObjectId(ownerId);
    const book = await bookService.addBook(bookData, ownerId);

    res.json({
      status: 200,
      message: "Book added successfully",
      success: true,
      book: book,
    });
  } catch (error) {
    res.json({
      status: 401,
      message: error.message,
      success: false,
    });
  }
};

module.exports = { addBook };
