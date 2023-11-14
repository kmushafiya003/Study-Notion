const jwt = require('jsonwebtoken');
require("dotenv").config();


//auth
exports.auth = async(req ,res , next) =>{
    try{

        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer " , "");

        // console.log("Auth Token : ", token);

        //if token missing  , then return response
        if(!token){
            console.log("Token is missing");
            return res.status(401).json({
             success : false,
             message : "Token is missing",
            })
        }

        //verify the token
        try{

            const decode = jwt.verify(token , process.env.JWT_SECRET);
            // console.log("I am decode token (payload) : " , decode);

            req.user = decode;


        }catch(err){
            console.log("Error while Verifying token : " , err);
            return res.status(401).json({
                success : false,
                message : "Error while Verifying token",
                error : err.message
               })
        }

        next();

    }catch(err){

        console.log("Error in Auth Middleware : " , err);
        return res.status(500).json({
             success : false,
             error : err.message,
             message : "Something went wrong while authentication"
         })

    }
}

//isStudent
exports.isStudent = async(req , res , next) => {
    try{

        const user = req.user.accountType;

        if(user !== "Student"){
            return res.status(401).json({
                success : false,
                message : "This is a protected route for students only",
            })

        }
        next();

    }catch(err){
        console.log("Error in isStudent Middleware : " , err);
        return res.status(500).json({
             success : false,
             error : err.message,
             message : "User role cannot be verified , please try again"
         })
    }
}


//isInstructor
exports.isInstructor = async(req , res , next) => {
    try{

        const user = req.user.accountType;

        if(user !== "Instructor"){
            return res.status(401).json({
                success : false,
                message : "This is a protected route for Instructor only",
            })

        }
        next();

    }catch(err){
        console.log("Error in isInstructor Middleware : " , err);
        return res.status(500).json({
             success : false,
             error : err.message,
             message : "User role cannot be verified , please try again"
         })
    }
}


//isAdmin
exports.isAdmin = async(req , res , next) => {
    try{

        const user = req.user.accountType;

        if(user !== "Admin"){
            return res.status(401).json({
                success : false,
                message : "This is a protected route for Admin only",
            })

        }
        next();

    }catch(err){
        console.log("Error in isAdmin Middleware : " , err);
        return res.status(500).json({
             success : false,
             error : err.message,
             message : "User role cannot be verified , please try again"
         })
    }
}
