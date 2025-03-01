const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User.model");


exports.auth = async (req, res, next) => {exports
  try {
    // extract token from request
    // const token = 
    // req.cookies.token ||
    // req.body.token ||
    // req.header("Authorization").replace("Bearer ", "");
    // 

    let token;
if (req.cookies && req.cookies.token) {
  token = req.cookies.token;
} else if (req.body && req.body.token) {
  token = req.body.token;
} else if (req.headers.authorization) {
  // This splits the header into "Bearer" and the token
  token = req.headers.authorization.split(" ")[1];
}


    // if token missing
     if (!token){
       return res.status(404).json({
        success: false,
        message: "JWT token is missing",
       })
     }

     // validating token
     try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
     }
     catch(err){
        return res.status(401).json({
          success: false,
          message: "Error occured while verifying jwt token",
        })
     }
     next();
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error occured while authenticating user",
    });
  }

};



exports.isBorrower  = async (req, res, next) => {
  try {
    if (req.user.role !== "Borrower"){
      return res.status(401).json({
        success: false,
        message: "This is a protected route for borrowers only",
      });
    }
    next();
  }
  catch(err){
    return res.status(401).json({
      success: false,
      message: "This is a protected route for borrowers only",
    })
  }
}


exports.isLibrarian = async (req, res, next) => {
  try {
  
    if (req.user.role !== "Librarian"){
      
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Librarian only",
      });
    }
    next();
  }
  catch(err){
    return res.status(401).json({
      success: false,
      message: "User's role cannot be verified",
    });
  }
};

