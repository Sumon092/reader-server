const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: 0,
  },
  wishLists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
      select: 0,
    },
  ],
  reading: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
      select: 0,
    },
  ],
  ownedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
      select: 0,
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
