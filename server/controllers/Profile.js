const Profile = require('../models/Profile');
const User = require('../models/User');
const { uploadImagetoCloudinary } = require('../utils/imageUploader');
require("dotenv").config();


//create Profile

exports.updateProfile = async (req, res) => {
    try {

        //fetch all data of profile
        const { about = " ", contactNumber, dateOfBirth = "", gender } = req.body;

        //userId
        const userId = req.user.id;


        //validation
        if (!contactNumber || !gender) {
            console.log("Pleases Enter required Details ");
            return res.status(402).json({
                success: false,
                message: "Please Enter required Details",
            })

        }
        //validation on ID
        if (!userId) {
            console.log("User ID Not Found ");
            return res.status(400).json({
                success: false,
                message: "User ID Not Found ",
            })

        }

        //find Profile

        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;

        const profile = await Profile.findById(profileId);
      

            //update profile fields

            profile.dateOfBirth = dateOfBirth,
            profile.about = about,
            profile.gender = gender,
            profile.contactNumber = contactNumber,

            //save the updated profile

            await profile.save();

            const updateProfileDetails = await User.findById(userId).populate("additionalDetails").exec();

            console.log("Update Profile Details : " , updateProfileDetails);

            console.log("Profile : " , profile);
          
        //return response

        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            updateProfileDetails,
        })






    } catch (err) {
        console.log("Something went wrong while updating Profile ");
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating Profile ",
            error: err.message,
        })
    }
}

//delete Account
//how can we schedule this deletion operation
//explore cron-job

exports.deleteAccount = async (req, res) => {



    try {
        //fetch account Id
        const userId = req.user.id;

        const userDetails = await User.findById(userId);

        //Validation
        if (!userDetails) {
            console.log("User Not Found");
            return res.status(404).json({
                success: false,
                message: "User Not found"
            })
        }


        //delete Profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

        //TODO : HW := unenroll user from all enrolled students

        //delete User

        await User.findByIdAndDelete({ _id: userId });



        //return response
        return res.status(200).json({
            success: true,
            message: "Account Deleted Successfully"
        })


    } catch (err) {

        console.log("Something went wrong while deleting Account ");
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting Account ",
            error: err.message,
        })

    }
}


//All user Detail
exports.getAllUserDetails = async (req, res) => {
    try {
        //fetch User Detail 
        const userId = req.user.id;

        //fetch User with above User Id

        const allUserDetails = await User.findById(userId)
            .populate("additionalDetails")
            .exec();

        console.log("AllUserDetails : ", allUserDetails);

        //validation

        if (!allUserDetails) {
            console.log("User not found with this ID");
            return res.status(404).json({
                success: false,
                message: "User not found with this ID"
            })
        }

        //send response

        return res.status(200).json({
            success: true,
            message: "User Data Fetched Successfully",
            data: allUserDetails,

        })


    } catch (err) {
        console.log("Something went wrong while showing all details of User");
        res.status(500).json({
            success: false,
            message: "Something went wrong while showing all details of User",
            error: err.message,
        })
    }
}


//upload a profile picture

exports.updateDisplayPicture = async (req, res) => {
    try {
        console.log("1")
        const userId = req.user.id;
        // console.log("User : " , req.user);
        console.log("2")
        console.log("Files : ", req.files);
        const displayPicture = req.files.displayPicture;
        console.log("3")

        if (!displayPicture) {
            res.json({
                success: false,
                message: "DisplayPicture is empty"
            })
        }
        console.log("4")
        console.log("Image going to upload on cloudinary");
        const image = await uploadImagetoCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image)
        console.log("5")
        console.log("Image going to upload on DB");
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while uploading a display picture"
        })
    }
};

//get enrolled courses

exports.getEnrolledCourses = async (req, res) => {
    try {
        //fetch userId
        const userId = req.user.id;

        //fetch userDetails with populate the course field
        const userDetails = await User.findById({ _id: userId })
            .populate("courses")
            .exec();
        //validation
        if (!userDetails) {
            console.log("No user found with this ID");
            return res.status(404).json({
                success: false,
                message: "No user found with this ID",
            })
        }
        //return res
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
            message: "Enrolled Courses fetched Successfully",

        })

    } catch (err) {
        console.log("Error while fetching all courses");
        return res.status(500).json({
            success: false,
            message: "Error while fetching enrolled courses",
            error: err.message,
        })
    }
}