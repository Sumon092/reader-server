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
  },
  wishLists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
    },
  ],
  reading: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
    },
  ],
  ownedBook: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
