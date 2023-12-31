const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  wishLists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
      select: false,
    },
  ],
  reading: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
      select: false,
    },
  ],
  ownedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
      select: false,
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
