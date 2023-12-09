const express = require('express');

const router = express.Router();


//import handler and middleware

const {capturePayment , verifyPayment , sendPaymentSuccessEmail} = require('../controllers/Payments');
const {auth , isStudent} = require('../middlewares/auth');

//define method , path and handler

router.post("/capturePayment" , auth ,isStudent , capturePayment);
router.post("/verifyPayment" ,auth ,isStudent , verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;
