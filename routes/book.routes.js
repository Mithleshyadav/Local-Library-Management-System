const express = require("express");

const router = express.Router();

const {addBook , getAvailableBooks, getAllBooks,getBorrowersOfBook, getIssuedBooks} = require("../controllers/book.controller");
const {auth, isLibrarian, isBorrower} = require("../middlewares/authMiddleware");

router.post("/addBook", auth, isLibrarian, addBook);
router.get("/getAvailableBooks", getAvailableBooks);
router.get("/getAllBooks", getAllBooks);
router.get("/get/:bookId", auth, isLibrarian, getBorrowersOfBook);
router.get("/getIssuedBooks/get/:userId", auth, isBorrower, getIssuedBooks)

module.exports = router;