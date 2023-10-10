const User = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUser = async (userInfo) => {
  const { email, password, name, phoneNumber } = userInfo;
  const existingEmail = await User.findOne({ email: email });
  if (!existingEmail) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: hashedPassword,
    });

    await user.save();
    return user;
  } else {
    throw new Error("User already exists");
  }
};

// const loginUser = async (email, password) => {
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error("Invalid user or password");
//   }

//   const userEmail = user.email || "";
//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     throw new Error("Invalid user or password");
//   }

//   const token = jwt.sign({ email: userEmail }, process.env.ACCESS_TOKEN_SECRET);
//   return token;
// };

const loginUser = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Invalid email or password");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET);
    return { token };
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

const getAuthUser = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    return user;
  } else {
    throw new Error("User is not authenticated");
  }
};

module.exports = {
  createUser,
  loginUser,
  getAuthUser,
};
