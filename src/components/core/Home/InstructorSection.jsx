import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png';
import HighlightText from '../../common/HighlightText';
import CTAButton from '../../common/Button';
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
    return (
        <div className=' flex sm:flex-row flex-col sm:justify-center items-center xmd:gap-20 md:gap-12 sm:gap-8 xs:gap-16 gap-10 '>

            {/* ------------------------------ left side -------------------------------- */}

            <div className='sm:w-[45%] w-[80%]'>

                <img src={Instructor} alt="Instructor" className='reverse-white-shadow  ' />

            </div>


            {/* ---------------------------- right side --------------------------------------- */}
            <div className='md:w-[40%] sm:w-[45%] xs:w-[80%] w-[95%] mx-auto sm:mx-0 flex flex-col justify-center gap-5'>

                <h2 className='lg:text-4xl text-3xl font-semibold lg:w-[50%] w-[90%] '>Become an <HighlightText text={"instructor"}></HighlightText> </h2>

                <p className='font-medium md:text-[16px] sm:text-[14px] text-[16px] lg:w-[80%] text-richblack-300'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>

                <div className='w-max mt-8'> 
                <CTAButton active={true} linkto={"/signup"}> 
                     <div className='flex gap-3 items-center'>
                        <p>Start Teaching Today</p>
                        <FaArrowRight></FaArrowRight>
                     </div>
                </CTAButton>

                </div>

              

              

            </div>


        </div>
    )
}

export default InstructorSection