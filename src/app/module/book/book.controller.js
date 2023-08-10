const bookService = require("./book.services.js");
const mongoose = require("mongoose");
const addBook = async (req, res) => {
  try {
    const bookData = req.body;
    const ownerId = req.user.email;
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
const getAllBook = async (req, res) => {
  try {
    const result = await bookService.getAllBook();
    res.json({
      status: 200,
      message: "retrieve books successfully",
      success: true,
      book: result,
    });
  } catch (error) {
    res.json({
      status: 401,
      message: error.message,
      success: false,
    });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await bookService.getSingleBook(bookId);

    res.json({
      status: 200,
      message: "retrieve book successfully",
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

module.exports = { addBook, getAllBook, getSingleBook };
