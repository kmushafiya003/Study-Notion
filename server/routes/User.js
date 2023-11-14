const express = require('express');

const router = express.Router();

//import Handler and middleware

// ---------------------------------- Authentication ----------------------------------------------

const {sendOTP , signup , login , changePassword} = require('../controllers/Auth');


// ---------------------------------------------------------------------------------------------------------------
//                                        RESET PASSWORD
// --------------------------------------------------------------------------------------------------------------

const {resetPasswordToken , resetPassword} = require('../controllers/ResetPassword');

//----------------------------------------  Midllewares ---------------------------------------------------------

const {auth} = require('../middlewares/auth');



//define method , path and handler

//----------------------------------------Authentication -----------------------------------------

router.post("/signup" , signup);
router.post("/login" , login);
router.post("/sendotp" , sendOTP);
router.post("/changepassword" , auth , changePassword);


//------------------------------------ Reset Password ---------------------------------------------

router.post("/reset-password-token" , resetPasswordToken );
router.post("/reset-password" , resetPassword);

module.exports = router;