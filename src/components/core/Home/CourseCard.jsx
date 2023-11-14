import React from 'react'
import {BsFillPeopleFill} from "react-icons/bs"
import {BiSolidBarChartAlt2} from "react-icons/bi"

const CourseCard = ({course , currentCard , setCurrentCard}) => {
  return (
    <div className={`flex flex-col  lg:gap-3 gap-1 text-richblack-400  lg:py-4 md:py-2 py-5 lg:px-5 md:px-2 px-5 
    sm:w-[80%] w-[95%] cursor-pointer mx-auto md:mx-0 mt-8 md:mt-0
    ${currentCard === course.heading ? "bg-white yellow-shadow" : "bg-richblack-800 shadow-md shadow-richblack-200"} transition-all duration-500
    ` } onClick={()=>{
        setCurrentCard(course.heading)
    }}>
        <h2 className={`text-[20px] font-semibold
        ${currentCard === course.heading ? "text-richblack-900" : "text-white"} 
        `}>{course.heading}</h2>
        <p className={`lg:text-[16px] md:text-[14px] sm:text-[16px] text-[14px]
        ${currentCard === course.heading ? "text-richblack-500" : "text-richblack-400"}
        `}>
            {course.description}
        </p>
        
        <div className={`flex justify-between md:px-3 px-1  border-top-dashed md:mt-16 mt-12 lg:text-[16px] md:text-[14px] text-[16px]
        ${currentCard === course.heading ? "text-blue-500" : "text-richblack-300"}
        `}>
            <div className='flex flex-row items-center md:gap-2 gap-1 py-3 '>
                <BsFillPeopleFill></BsFillPeopleFill>
                {course.level}
            </div>
            <div className='flex flex-row items-center  md:gap-2 gap-1 py-3 '>
                <BiSolidBarChartAlt2></BiSolidBarChartAlt2>
                {course.lessionNumber} Lessons
            </div>
        </div>

    </div>
  )
}

export default CourseCard