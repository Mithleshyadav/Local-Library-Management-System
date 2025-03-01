const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, 'Username must be at least 3 characters long'],
  },
  email: {
    type: String,
    requred: true,
    unique: true,
    lowerCase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  role: {
    type: String,
    enum: ['Librarian', 'Borrower'],
    default: 'Borrower',
  }
});


userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id:this._id , role: this.role}, process.env.JWT_SECRET_KEY, {expiresIn: '7h'});
  return token;
}
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password){
  return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model('user', userSchema);