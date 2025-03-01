const userModel = require('../models/User.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');


module.exports.registerUser = async (req, res, next) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array() });
  }

  const {username,email, password, role} = req.body;

const isUserAlreadyExist = await userModel.findOne({email});

if(isUserAlreadyExist) {
  res.status(400).json({message: 'User already exist'});
}

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    username,
    email, 
    password: hashedPassword,
    role
  });

  const token = user.generateAuthToken();
  res.status(201).json({token,user});
}


module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }

  const {email, password} = req.body;

  const user = await userModel.findOne({email}).select('+password');

  if(!user) {
    return res.status(401).json({message: 'Invalid email or password'});
  }

  const isMatch = await user.comparePassword(password);

  if(!isMatch){
    return res.status(401).json({message: 'Invalid email or password'});
  }

  const token = user.generateAuthToken();
  res.cookie('token', token);
  res.status(201).json({token, user});
}

