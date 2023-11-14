const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
//reset Password Token#

exports.resetPasswordToken = async(req ,res) => {
    try{
        //get email from req body
        const email = req.body.email ;

        // email validation
    
        if(!email) {
            console.log("Email is not present!!");
            return res.json({
                message : "Please Enter Email first"
            })
        }

        //check user for this email ,

        const user = await User.findOne({email : email});

        if(!user){
            console.log("User is not present with this email");
            return res.json({
                message : "Your Email is not registered with Us"
            })
        }

        //generate token

        const token = crypto.randomBytes(20).toString("hex");

        // console.log("Reset Password token : ", token);

        //update user by adding token and expiration time

        const updateDetails = await User.findOneAndUpdate({email : email} , {
                 
            token : token,
            resetPasswordExpires : Date.now() + 3600000,
        } , {new : true});

        // console.log("Update Details : " , updateDetails);

        //create url

        const url = `http://localhost:3000/update-password/${token}`;

        //send mail
        await mailSender(email , `Password Reset Link` , `Password Reset Link : ${url}`);


        //send response

        return res.status(200).json({
            success : true,
            message : "Email Sent Successfully , Please check your email and change password",
        })


    }catch(err){

        console.log("Problem while Sending mail for Reset Password : ", err);
        return res.status(500).json({
            success : false,
            error : err.message,
            message : "Something went wrong while sending reset password link"
        })

    }
}

//reset Password

exports.resetPassword = async(req ,res)=>{
    try{

     ///fetch all data
     const {password , confirmPassword , token} = req.body

     //validation
     if(password !== confirmPassword){
        console.log("Password not matched , Try again");
        return res.json({
            message : "Password not matched"
        })
     }

     //get userDetails from db  using token

    const userDetails = await User.findOne({token});

     //if no entry -> Invalid token
     if(!userDetails){
        console.log("Invalid Token, User Not Found");
        return res.json({
            success : false,
            message : "Invalid Token"
        })
     }

     //token time check
     if(userDetails.resetPasswordExpires < Date.now()){

        console.log("Token Expires ");
        return res.status(403).json({
            success : false,
            message : "Token is expired, Please regenerate your token"
        });

     }

     //hash the password

     const hashedPassword = await bcrypt.hash(password , 10)

     //update new password on db

     await User.findOneAndUpdate({token : token},{
        password : hashedPassword,
     } , {new : true})

     //return response

     res.status(200).json({
        success : true,
        message : "Password Reset Successfullyx"
     })

    }catch(err){

        console.log("Problem while Reset Password : ", err);
        return res.status(500).json({
            success : false,
            error : err.message,
            message : "Something went wrong while reset password"
        })

    }
}