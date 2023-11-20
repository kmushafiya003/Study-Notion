const Section = require('../models/Section');
const Course = require('../models/Course');
const SubSection = require('../models/SubSection');
const mongoose = require('mongoose');


//create a section

exports.createSection = async(req , res)=>{
    try{

        //fetch data(sectionName) from req.body
        const {sectionName , courseId} = req.body

        //validation
        if(!sectionName || !courseId){
            console.log("All fields are required");
            res.status(400).json({
                success : false,
                message : "All fields are required",
            })

        }
        //create entry of section in DB

        console.log("Section mei jaa raha hai")

        const newSection = await Section.create({
            sectionName,
        })

        console.log("Section mei create ho gaya")
          
        //Update Course with  this section ID
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id : courseId}, {
            $push : {
                courseContent : newSection._id
            }
        } , {new : true})
       .populate({
        path : "courseContent",
        populate : {
            path :"subSection"
        }
       })
       .exec();

       console.log("Course mei section gaya")
       

        //return res
        res.status(200).json({
            success : true,
            message : "Section Created Successfully",
            section : newSection,
            updatedCourseDetails,
        })

    }catch(err){

        console.log("Something Went wrong while creating section");
        res.status(500).json({
            success : false,
            message : "Cannot Create Section right now , please try again",
            error : err.message,
        })

    }
}

//update a section

exports.updateSection = async(req ,res) =>{
    try{
        //fetch data
        const {sectionName , sectionId , courseId} = req.body;

        //validation
        if(!sectionName || !sectionId || !courseId ){

            console.log("All fields are required");
            res.status(400).json({
                success : false,
                message : "All fields are required",
            })

        }

        //update data  on DB

        const updateSection = await Section.findByIdAndUpdate(sectionId,{
            sectionName
        }, {new : true})

        const updatedCourse = await Course.findById(courseId)
        .populate({
            path : "courseContent",
            populate : {
                path : "subSection"
            }
        }).exec()
            
        


        //return response

        return res.status(200).json({
            success : true,
            message : "Section Updated Successfully",
           updateSection,
           data : updatedCourse,
        })


    }catch(err){
        console.log("Something Went wrong while updating section");
        res.status(500).json({
            success : false,
            message : "Cannot Update Section right now , please try again",
            error : err.message,
        })

    }
}

//delete a section

exports.deleteSection = async(req ,res) => {
   try{
       //fetch id
       const {sectionId , courseId} = req.body;

    

        //TODO[Testing] : Do we NEED to delete the entry from the course Schema ??

        // cId = new mongoose.Types.ObjectId(courseId);

        const updatedCourse = await Course.findByIdAndUpdate({_id : courseId} , {
            $pull : {
                courseContent : sectionId,
            }
        } , {new : true});


        const section = await Section.findById(sectionId);


        if(!section){
            console.log("Section nhi hai");
            return res.status(400).json({
                success : false,
                message : "Section Not Found"
            })
        }

        //delete all the lecture which belongs to this section

         await SubSection.deleteMany({_id : {$in : section.subSection}});

           //delete from DB

           await Section.findByIdAndDelete(sectionId);

        //return response

        const course = await Course.findById(courseId).populate({
            path : "courseContent" ,
            populate : {
                path : "subSection"
            }
        }).exec();

    
        
        return res.status(200).json({
            success : true,
            message : "Section Deleted Successfully",
            data : course,
        })

   }catch(err){
    console.log("Something Went wrong while deleting section");
    res.status(500).json({
        success : false,
        message : "Cannot Delete Section right now , please try again",
        error : err.message,
    })

   }
}