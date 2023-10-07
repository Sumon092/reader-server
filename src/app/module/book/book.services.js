const User = require("../user/user.model");
const Book = require("./book.model");

const addBook = async (bookData, ownerId) => {
  const books = new Book(bookData);
  await books.save();
  const user = await User.findOne({ email: ownerId });
  if (!user) {
    throw new Error(`User with email ${ownerId} not found.`);
  }
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
  // const sortConditions = {};
  // if (sortBy && sortOrder) {
  //   sortConditions[sortBy] = sortOrder;
  // }
  const books = await Book.find(whereConditions);
  return books;
};

const getSingleBook = async (id) => {
  const book = await Book.findById(id);
  if (book) return book;
  throw new Error("Book not found");
};

const updateBook = async (id, updateData) => {
  const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (updatedBook) return updatedBook;
  throw new Error("Book not found");
};

const deleteBook = async (id) => {
  const deletedBook = await Book.findByIdAndDelete(id);
  if (!deletedBook) {
    throw new Error("Book not found");
  }

  return deletedBook;
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
