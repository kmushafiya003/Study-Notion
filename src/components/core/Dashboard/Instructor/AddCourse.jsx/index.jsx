import React from 'react'
import {AiFillThunderbolt} from 'react-icons/ai'
import RenderSteps from './RenderSteps'



const AddCourse = () => {
    return (
        <div className='w-[95%] lg:w-[90%] mx-auto flex xmd:flex-row flex-col-reverse gap-y-12 justify-between border '>

            {/* --------------  left side ---------- */}
            <div className='flex flex-col xmd:w-[66%] md:w-[85%] w-[90%] mx-auto gap-6'>
                <h1 className='text-richblack-5 smd:text-3xl sm:text-2xl xs:text-3xl text-2xl  font-semibold mb-5'>
                    Add Course
                </h1>


                <div className='w-full'>
                    <RenderSteps />
                </div>
            </div>

            {/* -------------- right side  ------------------ */}

            <div className='flex flex-col jusify-center py-6 px-6  xmd:px-4 xl:px-6  rounded-lg bg-richblack-700 gap-[19px] xmd:w-[32%] md:w-[85%] w-[90%] mx-auto border border-richblack-600 max-h-[500px]'>

                <h2>
                ⚡Course Upload Tips
                </h2>
                
                <ul className='flex flex-col list-disc gap-[11px] '>
                    <li className='text-[12px] font-medium text-richblack-5'>
                    Set the Course Price option or make it free.
                    </li>
                    <li className='text-[12px] font-medium text-richblack-5'>
                    Standard size for the course thumbnail is 1024x576.
                    </li>
                    <li className='text-[12px] font-medium text-richblack-5'>
                    Video section controls the course overview video.
                    </li>
                    <li className='text-[12px] font-medium text-richblack-5'>
                    Course Builder is where you create & organize a course.
                    </li>
                    <li className='text-[12px] font-medium text-richblack-5'>
                    Add Topics in the Course Builder section to create lessons, quizzes, and assignments.
                    </li>
                    <li className='text-[12px] font-medium text-richblack-5'>
                    Information from the Additional Data section shows up on the course single page.
                    </li>
                    <li className='text-[12px] font-medium text-richblack-5'>
                    Make Announcements to notify any important
                    </li>
                    <li className='text-[12px] font-medium text-richblack-5'>
                    Notes to all enrolled students at once.
                    </li>
                </ul>

  


            </div>

        </div>
    )
}

export default AddCourse