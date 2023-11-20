const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadImagetoCloudinary } = require('../utils/imageUploader');
require("dotenv").config();


//create a SubSection

exports.createSubSection = async (req, res) => {
    try {

        //fetch all data of subsection from req body
        const { sectionId , title , description } = req.body;

   

        //fetch video from req.body
        const video = req.files.videoFile;

        //validation
        

        if (!title  || !description || !sectionId || !video ) {
            console.log("All fields are required");
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        //upload video to cloudinary  and get url of video

        const videoResponse = await uploadImagetoCloudinary(video, process.env.FOLDER_NAME);

        //create entry on DB

        const subSectionDetail = await SubSection.create({
            title: title,
            timeDuration: `${videoResponse.duration}`,
            description: description,
            videoUrl: videoResponse.secure_url,
        })

        //Update Section with this subSection OjectID

        const updatedSection = await Section.findByIdAndUpdate({ _id: sectionId }, {
            $push: {
                subSection: subSectionDetail._id
            }
        }, { new: true }).populate("subSection");

        //return response

        return res.status(200).json({
            success: true,
            message: "SubSection Created Successfully ",
            data : updatedSection,
            subSectionDetail,
            
        })

    } catch (err) {
        console.log("Something went wrong while creating a subSection");
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating a SubSection",
            error: err.message,
        })
    }
}

//update subSection

exports.updateSubSection = async (req, res) => {
    try {
        //fetch the updated Data with subScetion ID

        const {sectionId ,title, description, subSectionId } = req.body;

        const subSection = await SubSection.findById(subSectionId);

        //validation
        if (!subSection) {
            console.log("Section Not Found");
            res.status(400).json({
                success: false,
                message: "Section not found with this ID",
            })
        }
        if (title !== undefined) {
            subSection.title = title;
        }

        if (description !== undefined) {
            subSection.description = description;
        }

        if (req.files && req.files.videoFile !== undefined) {
            const video = req.files.videoFile;

            const videoResponse = await uploadImagetoCloudinary(video, process.env.FOLDER_NAME);

            subSection.videoUrl = videoResponse.secure_url;
            subSection.timeDuration = `${videoResponse.duration}`;
        }

        //update on DB
        await subSection.save();

        const updatedSection = await Section.findById(sectionId).populate("subSection").exec()

        //return response

        res.status(200).json({
            success: true,
            message: "SubSection Updated Successfully",
            data : updatedSection 
        })

    } catch (err) {
        console.log("Something went wrong while updating a subSection");
        res.status(500).json({
            success: false,
            message: "Something went wrong while updating a SubSection",
            error: err.message,
        })

    }
}

//delete subSection

exports.deleteSubSection = async(req , res) => {
         try{

            //fetching Id from param
            const {sectionId , subSectionId} = req.body //testing id comes as paramter or req . body

             console.log("I am in SubSection");
            //validation 
            if(!subSectionId){
                console.log("No SubSection Found with this  Id");
                res.status(400).json({
                    success: false,
                    message: "No SubSection Found with this Id",
                })
            }

            //TODO[Testing] : Do we NEED to delete the entry from the section Schema ??

            //1st way -->Try  also this on TESTING

            // await Section.findOneAndUpdate({subSection : subSectionId} ,{
            //     $pull : {
            //         subSection : subSectionId,
            //     }
            // })

            //2nd way

            await Section.findByIdAndUpdate({_id : sectionId},{
                $pull : {
                    subSection : subSectionId
                }
            })


            await SubSection.findByIdAndDelete(subSectionId);

            const updatedSection = await Section.findById(sectionId).populate("subSection").exec();

             

            res.status(200).json({
              
                success: true,
                message: "SubSection Deleted Successfully",
                data : updatedSection ,
            })



         }catch(err){
            console.log("Something went wrong while deleting a subSection");
            res.status(500).json({
                success: false,
                message: "Something went wrong while deleting a SubSection",
                error: err.message,
            })

         }
}