const express = require("express");
const bookController = require("./book.controller.js");
const verifyToken = require("../../middleware/verifyToken.js");

const router = express.Router();

router.post("/add-book", verifyToken, bookController.addBook);
router.get("/", bookController.getAllBook);
router.get("/:bookId", bookController.getSingleBook);
router.patch("/:bookId", bookController.updateBook);
router.delete("/:bookId", bookController.deleteBook);
router.post("/wishList", verifyToken, bookController.addToWishList);
router.post("/reading", verifyToken, bookController.addToReading);

module.exports = router;
