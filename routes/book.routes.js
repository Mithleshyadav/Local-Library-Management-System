const express = require("express");

const router = express.Router();

const {addBook , getAvailableBooks, getAllBooks} = require("../controllers/book.controller");
const {auth, isLibrarian, isBorrower} = require("../middlewares/authMiddleware");

router.post("/addBook", auth, isLibrarian, addBook);
router.get("/getAvailableBooks", getAvailableBooks);
router.get("/getAllBooks", getAllBooks);

module.exports = router;