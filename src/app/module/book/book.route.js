const express = require("express");
const bookController = require("./book.controller.js");
const verifyToken = require("../../middleware/verifyToken.js");

const router = express.Router();

router.post("/add-book", verifyToken, bookController.addBook);
router.get("/all-book", bookController.getAllBook);
router.get("/:bookId", bookController.getSingleBook);

module.exports = router;
