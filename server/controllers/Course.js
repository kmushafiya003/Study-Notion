const Course = require('../models/Course');
const Category = require('../models/Category')
const User = require('../models/User');
const {uploadImagetoCloudinary} = require('../utils/imageUploader');

//create Course

exports.createCourse = async(req ,res) =>{
    try{
        //fetch all Data
        let {courseName , courseDescription , whatYouWillLearn , price , tag , category, instructions , status} = req.body

        //fetch file from req file for thumbnail

        console.log("Request FIles : ", req.files);

        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag  ||!category ){
            console.log("Please Fill all data");
            res.json({
                success : false,
                message : "All fields are required",
            })
        }

        if(!status || status === undefined){
            status = "Draft";
        }

        //check for instructor
        const userId = req.user.id;

        const instructorDetails = await User.findById(userId , {
            accountType : "Instructor",
        });

        console.log("Instructor Details : ", instructorDetails);

        if(!instructorDetails){
            console.log("Instructor Details are not found");
            res.status(400).json({
                success : false,
                message : "Instructor Details are not found",
            })

        }
        //verify that userId and InstructorDetails._id are same or different? 

        //check given Category is valid or not
        const categoryDetails = await Category.findById(category);

        if(!categoryDetails){
            console.log("Category Details are not found");
            res.status(400).json({
                success : false,
                message : "Category Details are not found",
            })

        }

        //upload Image to cloudinary

        const thumbnailImage = await uploadImagetoCloudinary(thumbnail , process.env.FOLDER_NAME);

        //create and entry for new course

        const newCourse = await Course.create({
            courseName ,
            courseDescription,
            instructor :  instructorDetails._id,
            whatYouWillLearn ,
            price,
            tag ,
            category : categoryDetails._id,
            thumbnail : thumbnailImage.secure_url,
            status : status,
            instructions : instructions,
        });

     //Add the new course to the user schema of Instructor

     await User.findByIdAndUpdate( {_id : instructorDetails._id} , {
        $push : {
            courses : newCourse._id,
        }
     } , {new : true});

     //update the tag Schema

     await Category.findByIdAndUpdate({_id : categoryDetails._id } , {
        $push : {
            courses : newCourse._id
        }
     } , {new : true});


     //return response

     return res.status(200).json({
        success : true,
        message : "Course Created Successfully",
        data : newCourse,
     })

    }catch(err){
        console.log("Error while creating a Course : " , err);
        res.status(500).json({
            success : false,
            error : err.message,
            message : "Something went wrong while creating course",
        })
    }
}

//fetch all Course

exports.showAllCourse = async(req , res) => {
    try{

        const allCourses = await Course.find({} , {
            courseName: true,
            instructor :  true,
            price: true,
            ratingAndReviews : true,
            studentsEnrolled : true,
        }). populate("instructor").exec();

        return res.status(200).json({
            success : true,
            message : "All Course Fetched Successfully",
            data : allCourses,
         })



    } catch(err){

        console.log("Error while showing all Courses : " , err);
        res.status(500).json({
            success : false,
            error : err.message,
            message : "Something went wrong while showing all course",
        })
    }
}

//getCourseDetails

exports.getCourseDetails = async(req ,res) => {
    try{
        const {courseId} = req.body

        const courseDetails = await Course.find({_id : courseId})
        .populate({
            path : "instructor",
            populate : {
                path : "additionalDetails"
            }
        })
        .populate({
            path : "courseContent",
            populate : {
                path : "subSection"
            }
        })
        .populate("ratingAndReviews")
        .populate("category")
        .populate("studentsEnrolled") 
        .exec();

        if(!courseDetails){
            console.log("Course Not found with this ID");
            return res.status(400).json({
                success : false,
                message : "Course Not found with this ID",
            })
        }

        return res.status(200).json({
            success : true,
            message : "Course details fetched Successfully",
            data : courseDetails,
        })

    }catch(err){
        console.log("Something went wrong while fetching all detailss of course");
        return res.status(500).json({
            success : false,
            message : "Something went wrong while fetching all detailss of course",
            error : err.message
        })

    }
}


//delete a course