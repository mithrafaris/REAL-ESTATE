const User = require('../models/usermodel');
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


exports.updateUser = async (req, res, next) => {
    try {
      
        if (!req.user || req.user.id !== req.params.id) {
            return next(errorHandler(401, "You can only update your own account"));
        }
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar
                }
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        // Pass any errors to the error handling middleware
        next(error);
    }
};
