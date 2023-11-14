const Section = require('../models/Section');
const Course = require('../models/Course');
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
        const {sectionName , sectionId} = req.body;

        //validation
        if(!sectionName , !sectionId){

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


        //return response

        return res.status(200).json({
            success : true,
            message : "Section Updated Successfully",
            data : updateSection,
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

       //delete from DB

        await Section.findByIdAndDelete(sectionId);

        //TODO[Testing] : Do we NEED to delete the entry from the course Schema ??

        cId = new mongoose.Types.ObjectId(courseId);

        await Course.findByIdAndUpdate({_id : cId} , {
            $pull : {
                courseContent : sectionId,
            }
        } , {new : true});

        //return response

    
        
        return res.status(200).json({
            success : true,
            message : "Section Deleted Successfully"
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