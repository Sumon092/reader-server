const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.json({
      status: 401,
      message: "token not found",
    });
  }
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    return res.json({
      status: 401,
      message: "token not found",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.json({
        status: 403,
        message: "forbidden access",
      });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
