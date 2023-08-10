const User = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUser = async (userInfo) => {
  const { email, password } = userInfo;
  const existingEmail = await User.findOne({ email: email });
  if (!existingEmail) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: userInfo.name,
      email: email,
      phoneNumber: userInfo.phoneNumber,
      password: hashedPassword,
    });
    await user.save();
    return user;
  } else {
    throw new Error("User already exist");
  }
};
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid user or password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid user or password");
  }
  const token = jwt.sign(
    { email: user.email },
    process.env.ACCESS_TOKEN_SECRET
  );
  return token;
};

const getAuthUser = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    return user;
  } else {
    throw new Error("user is not authenticated");
  }
};

module.exports = {
  createUser,
  loginUser,
  getAuthUser,
};
