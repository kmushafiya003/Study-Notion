const express = require('express');

const router = express.Router();


// import Handler and middleware


const {contactUs} = require("../controllers/ContactUs");

//define method , path and route

router.post("/contact" , contactUs);


module.exports = router;
