const pick = require("../../../shared/pick.js");
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
    const filter = pick(req.query, ["searchTerm", "genre", "publication_year"]);
    const result = await bookService.getAllBook(filter);
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
    const authUser = req.user.email;

    const updateBook = await bookService.updateBook(
      bookId,
      updateData,
      authUser
    );
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
    const authUser = req.user.email;
    await bookService.deleteBook(bookId, authUser);
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
    const { id } = req.params;
    const wishListed = await bookService.addToWishListService(email, id);
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
    const { id } = req.params;
    const addedReading = await bookService.addToReading(email, id);
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

const addReviewController = async (req, res) => {
  const { bookId } = req.params;
  const { review } = req.body;
  try {
    const updatedBook = await bookService.addReview(bookId, review);
    res.json({
      success: true,
      book: updatedBook,
      message: "Review added successfully.",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getReview = async (req, res) => {
  const { bookId } = req.params;

  try {
    const review = await bookService.getReviewById(bookId);

    res.json({
      success: true,
      data: review,
      message: "Review added successfully.",
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
};
const getWishList = async (req, res) => {
  const authEmail = req.user.email;
  const result = await bookService.getWishLists(authEmail);
  res.json({
    success: true,
    message: "WishListed book fetched successfully",
    data: result,
  });
};
const getReadingList = async (req, res) => {
  const authEmail = req.user.email;
  const result = await bookService.getReadingBook(authEmail);
  res.json({
    success: true,
    message: "WishListed book fetched successfully",
    data: result,
  });
};

module.exports = {
  addBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
  addToWishList,
  addToReading,
  addReviewController,
  getReview,
  getWishList,
  getReadingList,
};
