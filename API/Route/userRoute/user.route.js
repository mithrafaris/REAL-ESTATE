const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../../Controller/userController');

// signup route
router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;
