const express = require("express");
const router = express.Router();
const userController = require("./user.controller.js");
const verifyToken = require("../../middleware/verifyToken.js");

router.get("/user", verifyToken, userController.getAuthUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

module.exports = router;
