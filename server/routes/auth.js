const express = require('express');
const router = express.Router();
const { 
    register, 
    login , 
    resetpassword, 
    forgotpassword,
    googleSignIn
} = require('../controllers/auth');


router.route("/register").post(register)
router.route("/login").post(login)
router.route("/forgotpassword").post(forgotpassword);
router.route("/resetpassword/:resetToken").put(resetpassword);
router.route("/googleSignIn").post(googleSignIn)

module.exports = router;