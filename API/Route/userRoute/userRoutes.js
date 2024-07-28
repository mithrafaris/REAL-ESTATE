const express = require('express');
const { signUp, signIn, updateUser, } = require('../../Controller/userController');
const { google } = require('../../Controller/authController');
const { verifyToken } = require('../../utils/verifyUser');


const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', google );
router.post('/update/:id',verifyToken,updateUser)






module.exports = router;
