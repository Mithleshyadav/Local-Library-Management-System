const mongoose = require('mongoose');
const Book = require("../models/Book.model");
const Transaction = require("../models/Transactions.model");
const cloudinary = require("cloudinary").v2;
const uploadFileToCloudinary = require("../utils/uploadOnCloud");

exports.addBook  = async (req, res) =>{
  try {
    const { title, author, genre, isbn, description, copies} = req.body;
    const {bookImage} = req.files;

    if(!title || !author || !copies || !genre || !isbn || !description || !bookImage){
      res.status(400).json({
        success: false,
        message: "Please provde all details",
      });
    }
     
    //check if book already exists
    const bookExists = await Book.findOne ({isbn: isbn});
    if(bookExists){
      res.status(400).json({
        success: false,
        message: "Book already exists",
      });
    }

    let bookImageURL = await uploadFileToCloudinary(
      bookImage,
      process.env.CLOUDINARY_FOLDER_NAME,
    );
    if(!bookImageURL){
      res.status(500).json({
        succss: false,
        message: "Error in uploading image to cloudinary",
      });
    }

    bookImageURL = bookImageURL.secure_url;
    const book = await Book.create({
      title,
      author,
      genre,
      isbn,
      description,
      copies,
      bookImage: bookImageURL,
    });
    res.status(201).json({
      success: true,
      message: "Book added successfully"
    });
  }
  catch (err){
    console.log("Error in addBook: ", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
}

exports.getAvailableBooks = async (req, res) => {
  try {
    const books = await Book.find({availability: true
    });
    res.status(200).json({
      success: true,
      message: "List of available books",
      data: books,
    })
  }
  catch (err) {
    console.log("Error in gatAbailableBooks: ", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}


exports.getAllBooks =async (req,res)=>{
  try{
    const books = await Book.find({});
    res.status(200).json({
      success: true,
      message: "List of available books",
      data: books,
    })
  }
  catch(err){
    console.log("Error in getBooks: ",err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
}



exports.getBorrowersOfBook = async (req, res) => {
  try {
    const { bookId } = req.params; // Corrected
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ error: "Invalid Book ID" });
    }

    // Fetch transactions and populate the userId field
    const borrowers = await Transaction.find({ book: bookId }).populate("userId");
//
    if (!borrowers.length) {
      return res.status(404).json({ success: false, message: "No borrowers found for this book" });
    }

    return res.status(200).json({
      success: true,
      message: "List of borrowers of the book",
      borrowers,
    });

  } catch (err) {
    console.error("Error in getBorrowersOfBook:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// exports.getIssuedBooks = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     if (!userId)
//       return res
//         .status(400)
//         .json({ success: false, message: "Please provide user id" });
//     const books = await Transaction.find({ userId: userId }).populate("book");
//     return res.status(200).json({
//       success: true,
//       message: "List of issued books",
//       data: books,
//     });
//   } catch (err) {
//     console.log("Error in getIssuedBooks: ", err);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };


exports.getIssuedBooks = async (req, res) => {
  try {
    const { userId } = req.params;
    if(!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "UserId not available"
      })
    }

    const books = await Transaction.find({userId: userId}).populate("book");

    if (!books.length) {
      return res.status(404).json({ success: false, message: "No book borrowed by  this user" });
    }
    return res.status(200).json({
      success: true,
      message: "List of issued books",
      books,
    })
  }
  catch(err){
    console.log("Error in getIssuedBooks:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
}