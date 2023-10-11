const express = require("express");
const bookController = require("./book.controller.js");
const verifyToken = require("../../middleware/verifyToken.js");

const router = express.Router();
router.post("/wishList/:id", verifyToken, bookController.addToWishList);
router.get("/wishlists", verifyToken, bookController.getWishList);
router.get("/reading", verifyToken, bookController.getReadingList);
router.post("/add-book", verifyToken, bookController.addBook);
router.get("/", bookController.getAllBook);
router.get("/:bookId", bookController.getSingleBook);
router.patch("/:bookId", verifyToken, bookController.updateBook);
router.delete("/:bookId", verifyToken, bookController.deleteBook);

router.post("/reading/:id", verifyToken, bookController.addToReading);
router.post("/add-review/:bookId", bookController.addReviewController);
router.get("/get-review/:bookId", bookController.getReview);

module.exports = router;
