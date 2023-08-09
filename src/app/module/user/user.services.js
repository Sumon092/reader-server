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
    throw new Error("User with this email is already exist");
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
  console.log(token);
  return token;
};

module.exports = {
  createUser,
  loginUser,
};
