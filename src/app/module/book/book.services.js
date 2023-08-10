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

module.exports = {
  addBook,
};
