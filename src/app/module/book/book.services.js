const User = require("../user/user.model");
const Book = require("./book.model");

const addBook = async (bookData, ownerId) => {
  const user = await User.findOne({ email: ownerId });
  if (!user) {
    throw new Error(`User with email ${ownerId} not found.`);
  }
  const books = new Book(bookData);
  await books.save();
  await User.findOneAndUpdate(
    { email: ownerId },
    { $push: { ownedBooks: books._id } }
  );
  await Book.findOneAndUpdate(
    { _id: books._id },
    { $set: { bookOwner: user._id } }
  );
  const bookInfo = await Book.findById(books._id);
  return bookInfo;
};

const getAllBook = async (filter) => {
  const { searchTerm, ...filterData } = filter;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: ["title", "author", "genre"].map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const books = await Book.find(whereConditions).sort({ createdAt: -1 });
  return books;
};

const getSingleBook = async (id) => {
  const book = await Book.findOne({ _id: id });
  if (book) return book;
  throw new Error("Book not found");
};

const updateBook = async (id, updateData, email) => {
  const user = await User.findOne({ email });
  const userId = user?._id;
  const owner = await Book.findOne({ _id: id });
  const ownerId = owner.bookOwner[0];

  if (userId.equals(ownerId)) {
    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (updatedBook) return updatedBook;
    throw new Error("Book not found");
  } else {
    throw new Error("You are not authenticated to update this book");
  }
};
const deleteBook = async (id, email) => {
  const user = await User.findOne({ email });
  const userId = user?._id;
  const owner = await Book.findOne({ _id: id });
  const ownerId = owner.bookOwner[0];

  if (userId.equals(ownerId)) {
    const deletedBook = await Book.findOneAndDelete(id);
    if (deletedBook) return deletedBook;
    throw new Error("Book not found");
  } else {
    throw new Error("You are not authenticated to delete this book");
  }
};

const addToWishListService = async (email, bookId) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("User not found");
  }
  if (user.wishLists.includes(bookId)) {
    throw new Error("Book already wish listed");
  }
  const wishList = await User.findOneAndUpdate(
    { email: email },
    { $push: { wishLists: bookId } },
    { new: true }
  );
  return wishList;
};

const addToReading = async (email, bookId) => {
  const user = await User.findOne({ email: email });
  if (user.reading.includes(bookId)) {
    throw new Error("You already reading this book");
  }
  const reading = await User.findOneAndUpdate(
    { email: email },
    { $push: { reading: bookId } },
    { new: true }
  );
  return reading;
};

module.exports = {
  addBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
  addToWishListService,
  addToReading,
};
