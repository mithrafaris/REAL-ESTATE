const express = require('express');
const { signUp, signIn, updateUser, deleteUser,signOut, getUserListings } = require('../../Controller/userController');
const { google } = require('../../Controller/authController');
const { verifyToken } = require('../../utils/verifyUser');
const { createListing, deleteListing, updateListing } = require('../../Controller/ListingController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', google);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/signOut',signOut);
//listing
router.post('/create',verifyToken,createListing);
router.get('/listing/:id',verifyToken,getUserListings);
router.delete('/deletelisting/:id',verifyToken,deleteListing);
router.post('/updatelisting/:id',verifyToken,updateListing);


module.exports = router;
