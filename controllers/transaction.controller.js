const Transactions = require("../models/Transactions.model");
const userModel = require("../models/User.model");
const bookModel = require("../models/Book.model");

exports.borrowBook = async (req, res) => {
  try {
    const {userId, bookId} = req.body;
    if(!userId || !bookId){
      return res.status(400).json({
        success: false,
        message: "Please provide all the details",
      })
    }
    const user = await userModel.findById(userId);
    if(!user){
      return res.status(400.).json({
        success: false,
        message: "User not found",
      })
    }

    const book = await bookModel.findById(bookId);
    if(!book){
      return res.status(400).json({
        success: false,
        message: "Book not found",
      })
    }

    if (book.availability === false){
      return res.status(400).json({
        success: false,
        message: "Book is not available",
      })
    }

    const borrowedBook = await Transactions.findOne({bookId, userId});
    if(borrowedBook){
      return res.status(400).json({
        success: false,
        message: "You have already borrowed this book",
      })
    }

    const transaction = new Transactions({
      userId: userId,
      book: bookId,
    })
    await transaction.save();

    const updatedBook = await bookModel.findByIdAndUpdate(
      bookId,
      {$inc: {issued: 1}},
      {new: true}
    );
    if(updatedBook.issued === updatedBook.copies){
      updatedBook.availability = false;
    }
    await updatedBook.save();
    return res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
    })
   }
   catch(err){
      console.log("Error borrowing the book: ", err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      })
   }
  
}
