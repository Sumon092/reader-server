const User = require("./user.model");
const bcrypt = require("bcryptjs");

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

module.exports = {
  createUser,
};
