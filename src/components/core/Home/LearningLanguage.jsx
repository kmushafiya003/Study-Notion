import React from 'react';
import HighlightText from '../../common/HighlightText';
import know_your_progress from '../../../assets/Images/Know_your_progress.png';
import compare_with_others from '../../../assets/Images/Compare_with_others.png';
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.png';
import CTAButton from '../../common/Button';

const LearningLanguage = () => {
    return (
        <div className='w-full flex flex-col gap-6 '>

            {/* ------------------ Upper Section ------------------------ */}
            <div className='flex flex-col gap-5 '>
                <h1 className='lg:text-4xl text-3xl font-semibold text-center'>
                    Your swiss knife for <HighlightText text="learning any language" />
                </h1>
                <p className='text-center text-richblack-600 text-base lg:w-[55%] lg:mx-auto '>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </p>
            </div>

            {/* --------------------  Lower Section  ------------------------------ */}
            <div className='flex sm:flex-row flex-col items-center justify-center w-full relative  px-5'>

                 <img src={know_your_progress} alt="know_your_progress" className=' object-contain  xlg:-mr-[350px]  xlg:w-[435px] xmd:w-[350px] xmd:-mr-60  smd:w-[290px] smd:-mr-72 sm:w-[250px] sm:-mr-64 ' />

                 <img src={compare_with_others} alt="compare_with_others" className='object-contain xlg:-mb-10 xlg:ml-52  xmd:w-[400px] xlg:w-[502px] xmd:ml-40 smd:w-[350px] smd:ml-40 sm:w-[300px] sm:ml-40 -mt-14 sm:mt-0' />

                 <img src={plan_your_lesson} alt="plan_your_lesson" className='object-contain xlg:-ml-40 sm:-mt-10  xmd:w-[400px] xlg:w-[501px] xmd:-ml-36 smd:w-[350px] smd:-ml-28 sm:w-[300px] sm:-ml-28 -mt-20' />

            </div>

            {/* -------------------  Button Section --------------------------------------- */}

            <div className='w-full flex justify-center mt-8'>
                <CTAButton active={true} linkto={"/signup"}>Learn MOre</CTAButton>
            </div>
        </div>
    )
}

export default LearningLanguage;