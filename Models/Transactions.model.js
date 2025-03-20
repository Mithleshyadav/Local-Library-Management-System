// models/transaction.js

const mongoose = require("mongoose");



const TransactionSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  borrowedDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date
  },
  returnedDate: {
    type: Date,

  }
});

module.exports = mongoose.model("Transaction", TransactionSchema);