const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

// Sign In Function
exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const{password:pass,...rest}=validUser._doc;
    res
    .cookie('access_token',
       token,{httpOnly:true})
.status(200)
.json(rest)
  }catch(error){
    next(error)
  }
}