const express = require("express");
const router = express.Router();



const  { borrowBook, getTransactions, returnBook } = require("../controllers/transaction.controller");
const {auth, isLibrarian, isBorrower } = require("../middlewares/authMiddleware");



router.post("/borrow", auth, isBorrower, borrowBook);
router.get("/getTractions/:userId", auth, isBorrower, getTransactions);
router.post("/returnBook", auth, isBorrower, returnBook);

module.exports = router;