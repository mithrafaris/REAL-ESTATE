const express = require('express');
const Admin_router = express.Router();
const { AdminSignUp, AdminSignIn, deleteAdmin, signOut } = require('../../Controller/adminController')
const { verifyTokenAdmin } = require('../../utils/verifyAdmin');

Admin_router.post('/AdminSignup', AdminSignUp);
Admin_router.post('/AdminSignin', AdminSignIn);
Admin_router.delete('/delete/:id', verifyTokenAdmin, deleteAdmin);
Admin_router.get('/signout', signOut);

module.exports = Admin_router;
