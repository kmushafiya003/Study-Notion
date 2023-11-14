const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const mongoose  = require('mongoose');


//create RatingAndReview

exports.createRating = async(req , res)=> {
    try{

        //get userId
        const userId = req.user.id;

        //fetch Data from req body
        const {courseId , rating , review} = req.body
        

        //check if user is enrolled or not
       const courseDetails = await Course.findOne(
                                    {_id : courseId , 
                                    studentsEnrolled : {$elemMatch : {$eq : userId}},
                                    } );


        if(!courseDetails){
            console.log("Student not enrolled in the course");
            return res.status(404).json({
                success : false,
                message : "Student is not enrolled in the Course",
            })
        }

        //check if user already reviewed the course
        const checkUserAlreadyReviewed = await RatingAndReview.findOne({user : userId , 
                                                                       course : courseId,
                                                                            });

        if(checkUserAlreadyReviewed){
            console.log("You already reviewed in this course");
            return res.status(403).json({
                success : false,
                message : "You already reviewed in this course"
            })
        }

        //create Rating and Review
        const ratingAndReview = await RatingAndReview.create({
            rating , review , course : courseId , user: userId,
        })

        console.log("Your Rating and Review : ", ratingAndReview);

        //add this rating and Review on the given Id course ( update Course)
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            $push : {
                ratingAndReviews : ratingAndReview.id
            }
        } , {new : true});

        //return response
        return res.status(200).json({
            success : true,
            message : "You are Successfully rate and review the course",
            ratingAndReview,
        })

    }catch(err){
        console.log("An Error Occur while creating Rating");
        return res.status(500).json({
            success : false,
            message : "An Error occur while creating rating",
            error : err.message,
        })
    }
}


//getAverageRatingAndReview

exports.getAverageRating = async(req , res) => {
    try{
        //get course ID
        const courseId = req.body.courseId;

        //calculate average rating

        const result = await RatingAndReview.aggregate([
            {
                $match : {
                    course : new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group : {
                    _id : null,
                    averageRating : { $avg : "$rating"},
                }
            }
        ]);


        console.log("Result of Average Rating : ", result);

        //return rating
        if(result.length > 0){

            return res.status(200).json({
                success : true,
                averageRating : result[0].averageRating,
                message : "Average Rating fetched Successfully"
            })

        }
      
        //if no rating and Review Exist

        return res.status(200).json({
            success : true,
            message : "Average Rating is O , no rating given till now",
            averageRating : 0,
        })
      

    }catch(err){

        console.log("An error while finding average Rating and Review");

        return res.status(500).json({
            success : false,
            message : "Error while fetching average Rating and Review",
            error : err.message,
        })

    }
}


//getAllRatingAndReview based on courses

exports.getCourseRating = async(req ,res) => {
    try{

        const {courseId} = req.body;

        const courseRatings = await RatingAndReview.findOne({
            course : new mongoose.Types.ObjectId(courseId)
        });

        if(!courseRatings){
            console.log("There are no ratings for this course");
            return res.status(404).json({
                success : false,
                message : "No Rating for this Course",
            })
        }

        return res.status(200).json({
            success : false,
            message : "Successfully fetched ratings for specific course",
            data : courseRatings,
        })

       

    }catch(err){
        console.log("Error while fetching rating of specified course");
        return res.status(500).json({
            success : false,
            message : "Error while fetching rating of specified course"
        })
    }
}


//getAllRatingAndReview

exports.getAllRatingAndReviews = async(req ,res) => {
    try{
       const allRatingAndReviews = await RatingAndReview.find({})
                               .sort({rating : "desc"})
                               .populate({
                                path : "user",
                                select : "firstName lastName email image"
                               })
                               .populate({
                                path : "course",
                                select : "courseName"
                               })
                               .exec();



        return res.status(200).json({
            success : true,
            message : "All reviews fetched Successfully",
            data : allRatingAndReviews,
            
        });

    }catch(err){
        console.log("An error while fetching all ratings and review");

        return res.status(500).json({
            success : false,
            message : "An error while fetching all ratings and review",
            error : err.message ,
        })

    }
}


