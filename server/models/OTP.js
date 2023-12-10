const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require('../mail/templates/emailVerificationTemplate');

const otpSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    otp : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 5 * 60  * 1000,
    }

 
});

async function sendVerificationEmail(email , otp){
    try{
        console.log("Email from where we send the message: ", email)
        const mailResponse = await mailSender(email , "Verification Email From StudyNotion" , emailTemplate(otp));
        // console.log("Email Sent Successfully : " , mailResponse);

    }catch(err){
        console.log("Error occur while sending verification mail : " , err);
        throw err;
    }


}


// Define a post-save hook to send email after the document has been saved
otpSchema.pre("save" , async function (next){
    
    console.log("Pre midlleware Runn");
    	// Only send an email when a new document is created
          
        if(this.isNew){

            console.log("Inside send verification mail");

            await sendVerificationEmail(this.email , this.otp);
       

        }

        next();
 
})

// Define a post-save hook to send email after the document has been saved
// otpSchema.pre("save", async function (next) {
// 	console.log("New document saved to database");

// 	// Only send an email when a new document is created
// 	if (this.isNew) {
// 		await sendVerificationEmail(this.email, this.otp);
// 	}
// 	next();
// });



module.exports = mongoose.model("OTP" , otpSchema );