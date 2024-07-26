const express = require('express');
const { signUp, signIn } = require('../../Controller/userController');
const { google } = require('../../Controller/authController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', google );

module.exports = router;
