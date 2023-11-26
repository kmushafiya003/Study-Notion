const CourseProgress = require( "../models/CourseProgress");
 const SubSection = require( "../models/SubSection");


exports.updateCourseProgress = async (req, res) => {

    try {

        //fetch data like courseId and subsectonId

        const { courseId, subSectionId } = req.body;

        //fetch user from req.user

        const user = req.user;

        //fetch the subsection with the given id

        const subSection = await SubSection.findById(subSectionId);

        //validation on subsection

        if (!subSection) {
            console.log("SubSection not found with given id");
            return res.status(404).json({
                success: false,
                message: "SubSection not found with given Id"
            })
        }

        //check for old entry

        //fetch courseProgres from db by using courseId or userId

        const courseProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: user.id,
        });

        //validation on courseprogress

        if (!courseProgress) {
            console.log("Course Progress doesnt exist");

            return res.status(404).json({
                success: false,
                message: "Course Progress doesnt exist",
            })

        } else {


            //if courseprogress is found 

            console.log("CourseProgress Validation done")

            //check for re-completing the video or subsection

            if (courseProgress.completedVideos.includes(subSectionId)) {

                console.log("Video/Subsection already completed");

                return res.status(400).json({
                    message: "Subsection already completed"
                })
            }
            else {
                //if the video or subsection is new one then add it on completed video bu push it

                courseProgress.completedVideos.push(subSectionId);
                console.log("Adding the subsection successfully");

            }



        }

        //save the coursePorgress entry

        await courseProgress.save()

        //return response

        return res.status(200).json({
            success: true,
            message: "Courseprogress updated Successfully"
        })

    } catch (err) {

        console.log("Error in updating course progress");

        return res.status(500).json({
            success: false,
            message: "Error while updating the courseprogress",
            error : err.message,

        })
    }

}