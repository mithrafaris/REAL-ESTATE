const express = require('express');
const { signUp } = require('../../Controller/userController');
const router = express.Router();

router.post('/signup', signUp);

module.exports = router;
