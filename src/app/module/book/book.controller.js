const bookService = require("./book.services.js");
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

const updateBook = async (req, res) => {
  try {
    const updateData = req.body;
    const bookId = req.params.bookId;
    const updateBook = await bookService.updateBook(bookId, updateData);
    res.json({
      status: 200,
      success: true,
      message: "Update successful",
      data: updateBook,
    });
  } catch (error) {
    res.json({
      status: 401,
      success: false,
      message: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    bookId = req.params.bookId;
    console.log(bookId, "book id");
    await bookService.deleteBook(bookId);
    res.json({
      status: 200,
      success: true,
      message: "Book delete successful",
    });
  } catch (error) {
    res.json({
      status: 403,
      success: false,
      message: error.message,
    });
  }
};

const addToWishList = async (req, res) => {
  try {
    const email = req.user.email;
    const bookId = req.body.bookId;
    const wishListed = await bookService.addToWishListService(email, bookId);
    res.json({
      status: 200,
      success: true,
      message: "Added to wishlist",
      data: wishListed,
    });
  } catch (error) {
    res.json({
      status: 401,
      success: false,
      message: error.message,
    });
  }
};
const addToReading = async (req, res) => {
  try {
    const email = req.user.email;
    const bookId = req.body.bookId;
    const addedReading = await bookService.addToReading(email, bookId);
    res.json({
      status: 200,
      message: "Book added to reading",
      success: true,
      data: addedReading,
    });
  } catch (error) {
    res.json({
      status: 401,
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
  addToWishList,
  addToReading,
};
