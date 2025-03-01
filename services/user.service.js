const userModel = require('../models/User.model');


module.exports.createUser = async ({
  username, email, password,role
}) => {
  if(!username || !email || !password) {
    throw new Error('All fields are required');
  }
  const user = userModel.create({
    username,
    email,
    password,
    role
  })
  return user;
}