const User = require('../models/User');
const OTP = require('../models/OTP');
const Profile = require('../models/Profile');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender')
require("dotenv").config();


//sendOTP

exports.sendOTP = async (req, res) => {

    try {

        //1.fetch email from request body

        const { email } = req.body;
        console.log("Email for OTP : ", email);

        //2.check is user is already Exist

        const checkUserPresent = await User.findOne({ email });

        //if user already exist , then return a response


        if (checkUserPresent) {
            return res.json({
                success: false,
                message: "User already Registered"
            });
        }

        //3.generate OTP

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        console.log("OTP generated : ", otp);


        ///4.check unique otp or not
        let result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            result = await OTP.findOne({ otp: otp });
        }




        // const otpPayload = { email, otp };

        //5.create entry on DB

        const otpBody = await OTP.create({email , otp});

        // console.log("I am otpBody : ", otpBody);

        //return response

        res.status(200).json({
            success: true,
            message: "OTP Send Sucessfully",
            email,
            otp

        })



    } catch (err) {
        console.log("Error in Otp Send : ", err);
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Something went wrong while sending OTP"
        })
    }

}


//Signup
exports.signup = async (req, res) => {
    try {

        //fetch all info from request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body


        //Validate the Data

        if (!firstName || !lastName || !email || !password
            || !confirmPassword || !otp) {

            return res.json({

                message: "All fields are required"
            })
        }


        //2 password ko match krlo


        if (password !== confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "Password and ConfirmPassword value does not match, please try again"
            })
        }

        //.Check user is already exist or not


        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            console.log("User is already registered")
            return res.json({
                success: false,
                message: "User is already registered"
            });
        }



        // find most recent OTP stored for the User
        const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);

        console.log("Recent OTP : ", recentOtp);

        //validate the OTP

        if (!recentOtp) {
            //OTP NOT FOUND

            console.log("OTP not Found ")
            return res.json({
                success: false,
                message: "OTP not Found "
            })
        }


        if (recentOtp.length === 0) {
            //OTP NOT FOUND
            console.log("OTP not Found ")
            return res.json({
                success: false,
                message: "OTP not Found"
            })
        }

        else if (otp !== recentOtp.otp) {
            //Invalid otp
            console.log("Invalid OTP")
            return res.json({
                success: false,
                message: "Invalid OTP"
            })
        }



        // hash the user password

        const hashedPassword = await bcrypt.hash(password, 10);


        //create the User

        let approved = "";

        approved === "Instructor" ? (approved = false) : (approved = true);






        //Make profile to put it on db of user

        const profileDetail = await Profile.create({
            gender: null,
            profession: null,
            about: null,
            contactNumber: null,
            dateOfBirth: null,

        });




        //create entry on database
        const user = await User.create({
            firstName,
            lastName,
            email,
            approved: approved,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetail._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,

        })


        //return response
        return res.status(200).json({
            success: true,
            message: "User is registered Sucessfully",
            user
        })


    } catch (err) {

        console.log("Error in Signup : ", err);
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Something went wrong while Signup, Please try again"
        })

    }
}


//Login
exports.login = async (req, res) => {
    try {

        //fetch email and password request body

        const { email, password } = req.body;

        //validation on email and password
        if (!email || !password) {
            console.log("All fields Required")
            return res.status(403).json({
                success: false,
                message: "Please Fill all details, All fields are required"
            })
        }

        //check user is exist or not

        const user = await User.findOne({ email }).populate("additionalDetails");

        if (!user) {

            // Return 401 Unauthorized status code with error message
            console.log("User is not Regsitered...Please first Signup")
            return res.json({
                success: false,
                message: "User is not Regsitered...Please first Signup"
            })

        }


        //Generate JWT token , after matching password

        const payload = {
            id: user.id,
            email: user.email,
            accountType: user.accountType,
        }

        if (await bcrypt.compare(password, user.password)) {

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h"
            });

            //agr isme error aayega to yahi aayega

            // Save token to user document in database
            user.token = token;
            user.password = undefined;

            //  console.log("I am user in Login : ", user);

            const options = {
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            //create cookie and send response

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged In Successfully"
            })

        }
        else {
            console.log("Password is incorrect, please try again")
            return res.json({
                success: false,
                message: "Password is incorrect, please try again"
            })

        }


    } catch (err) {
        console.log("Error in Login : ", err);
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Something went wrong while Login, Please try again"
        })

    }
}


//change Password
exports.changePassword = async (req, res) => {
    try {

        //get user ID from auth
        const userId = req.user.id;

        //get User Detail from DB by using Id
        const userDetails = await User.findById(userId)

        //get all data from request body
        const { oldPassword, newPassword} = req.body;

        //validation
        if (!oldPassword || !newPassword ) {
            console.log("All fields are required");
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }

        //Now check the old password is correct or not

        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);

        if (!isPasswordMatch) {
            console.log("Password does not match , please enter correct password");
            return res.status(403).json({
                success: false,
                message: "Password does not match , please enter correct password"
            })
        }

        //Now check on new password and confirm password

        // if (newPassword !== confirmPassword) {
        //     console.log("Password is incorrect ....New password and confirm password are not same");
        //     return res.status(403).json({
        //         success: false,
        //         message: "Password is incorrect"
        //     })
        // }

        //if code comes here , it means password matched

        //Now hash the new password

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        //update in DB


        //user Id  ke jagah req.user.id use krna ek baar
        const updatedUserDetail = await User.findByIdAndUpdate(userId, {
            password: hashedPassword
        }, { new: true });

        //send the mail
        try {

            const emailResponse = await mailSender(updatedUserDetail.email,
                `Password Changed`, `Password Updated successfully for ${updatedUserDetail.firstName} ${updatedUserDetail.lastName} `);

            console.log("Email sent successfully:", emailResponse.response);

        } catch (err) {
            console.error("Error occurred while sending email:", err);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: err.message,
            });

        }

        //send response

        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })



    } catch (err) {

        console.log("Error in Change Password : ", err);
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Something went wrong while changing password, Please try again"
        })

    }
}