const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error');

// Sign Up Function
exports.signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log('Received signup request:', req.body);

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error while saving new user:', error);
    next(errorHandler(500, 'An error occurred while creating the user'));
  }
};
