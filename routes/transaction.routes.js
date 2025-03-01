const express = require("express");
const router = express.Router();

const  {borrowBook} = require("../controllers/transaction.controller");
const {authMiddleware, isLibrarian, isBorrower } = require("../middlewares/authMiddleware");

router.post("/borrow", authMiddleware, borrowBook);

module.exports = router;