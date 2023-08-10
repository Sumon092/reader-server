const express = require("express");
const bookController = require("./book.controller.js");
const verifyToken = require("../../middleware/verifyToken.js");

const router = express.Router();

router.post("/add-book", verifyToken, bookController.addBook);

module.exports = router;
