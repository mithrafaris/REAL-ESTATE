const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminmodel");
const { errorHandler } = require("../utils/error");

// Sign Up Function
exports.AdminSignUp = async (req, res, next) => {
  const { adminName, email, password } = req.body;
  console.log('Received signup request:', req.body);

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newAdmin = new Admin({ adminName, email, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Error while saving new admin:', error);
    next(errorHandler(500, 'An error occurred while creating the admin'));
  }
};

// Sign In Function
exports.AdminSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validAdmin = await Admin.findOne({ email });
    if (!validAdmin) return next(errorHandler(404, 'Admin not found!'));

    const validPassword = bcryptjs.compareSync(password, validAdmin.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    const token = jwt.sign({ id: validAdmin._id }, process.env.JWT_SECRET_KEY);
    const { password: pass, ...rest } = validAdmin._doc;
    res
      .cookie('access_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
      .status(200)
      .json(rest);
  } catch (error) {
    console.error('Error during sign-in:', error);
    next(error);
  }
};



// Delete Admin Function
exports.deleteAdmin = async (req, res, next) => {
  try {
    if (!req.admin || req.admin.id !== req.params.id) {
      return next(errorHandler(401, 'You can only delete your own account!'));
    }
    await Admin.findByIdAndDelete(req.params.id);
    res
      .clearCookie('access_token')
      .status(200)
      .json({ message: 'Admin has been deleted!' });
  } catch (error) {
    console.error('Error while deleting admin:', error);
    next(error);
  }
};



// Sign Out Function
exports.signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('Admin has been signed out');
  } catch (error) {
    console.error('Error during sign out:', error);
    next(error);
  }
};
