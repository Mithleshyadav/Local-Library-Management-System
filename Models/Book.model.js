const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    requiired: true,

  },
  genre: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  copies: {
    type: Number,
    required: true,
  },
  issued: {
    type: Number,
    default: 0,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  bookImage: {
    type: String,
    required: true,
  }
})
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
