const cloudinary = require("cloudinary").v2;
require("dotenv").config();

 const cloudinaryConnect = () =>{
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
     console.log('Connected to Cloudinary Successfully');
  }
  catch (error) {
    console.log(error);
  }
};

module.exports = cloudinaryConnect;