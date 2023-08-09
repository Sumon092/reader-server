const userService = require("./user.services.js");
const registerUser = async (req, res) => {
  try {
    const userInfo = req.body;
    const result = await userService.createUser(userInfo);
    res.json({
      status: 201,
      message: "user created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: error.message,
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);

    res.json({
      status: 201,
      message: "Login Successful",
      success: true,
      token: result,
    });
  } catch (error) {
    res.json({
      status: 401,
      message: error.message,
      success: false,
    });
  }
};
module.exports = {
  registerUser,
  loginUser,
};
