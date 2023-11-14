const express = require('express');

const router = express.Router();


//import handler and middleware

const {capturePayment , verifySignature} = require('../controllers/Payments');
const {auth , isStudent} = require('../middlewares/auth');

//define method , path and handler

router.post("/capturePayment" , auth ,isStudent , capturePayment);
router.post("/verifyPayment" , verifySignature);

module.exports = router;
