import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png'

const Timeline = () => {

    const Timeline = [
        {
            Logo: logo1,
            heading: "Leadership",
            desc: "Fully committed to the success company"
        },
        {
            Logo: logo2,
            heading: "Responsibility",
            desc: "Students will always be our top priority"
        },
        {
            Logo: logo3,
            heading: "Flexibility",
            desc: "The ability to switch is an important skills"
        },
        {
            Logo: logo4,
            heading: "Solve the Problem",
            desc: "Code your way to a solution"
        },
    ]

    return (
        <div className='w-full flex sm:flex-row flex-col sm:gap-2  gap-10  md:justify-center sm:justify-between  mb-20'>

            {/* --------------------- left side---------------------- */}
            <div className=' flex flex-col md:w-[40%] sm:w-[45%] w-[90%] mx-auto '>

                {
                    Timeline.map((element, index) => {
                        return (
                            <div className='flex flex-row gap-6' key={index}>
                                <div className='flex flex-col  items-start'>
                                    <div className='w-[50px] h-[50px] flex items-center justify-center bg-white rounded-full shadow-md shadow-richblack-50'>
                                        <img src={element.Logo} alt={element.Logo} className='w-[16px]' />
                                    </div>
                                  {
                                    index !== 3 ?
                                    (
                                       <div className='h-8 w-2 border-div outline-richblack-400 ml-4 my-1'>

                                       </div>
                                    ) :
                                    (
                                        <div></div>
                                    )
                                  }
                                </div>

                                <div className='flex flex-col '>
                                    <h2 className='font-semibold text-lg text-richblack-800'>{element.heading}</h2>
                                    <p className='text-[14px] text-richblack-700'>{element.desc}</p>
                                </div>

                            </div>
                        )
                    })
                }

            </div>

            {/* ------------------- right side  ------------------------- */}

            <div className='md:w-[45%] sm:w-[50%] w-[90%] mx-auto  relative '>

                <img src={timelineImage} alt="timelineImage" className='white-shadow relative z-10 h-full ' />

                {/* ------------------------- shadow oval ---------------------------- */}

                <div className=' sm:w-[103%] w-[99%] h-[150px] xs:h-[250px] xlg:h-[300px] absolute top-[25%]  rounded-full blue-shadow  '>

                </div>
                
                {/* ---------------------  overlap box  ------------------- */}
                <div className='bg-caribbeangreen-700 flex sm:flex-row flex-col s,sm:justify-between lg:w-[80%] xmd:w-[85%] mmd:w-[90%] smd:w-[95%] md:w-[98%] sm:w-full w-[50%] absolute lg:left-[15%] xmd:left-[10%] mmd:left-[8%] smd:left-[5%] md:left-[3%]  sm:top-[90%] -top-[1%] items-center uppercase z-10 md:px-3 px-1  py-5 gap-5 md:gap-0 '>
                   <div className='flex flex-row items-center md:gap-5 gap-3 sm:border-r sm:border-caribbeangreen-300 sm:pr-6 pr-0'>
                        <h1 className='text-white text-3xl sm:text-2xl xmd:text-3xl font-bold'>10</h1>
                        <h2 className='text-caribbeangreen-300 text-semibold text-[12px]'>YEARS  EXPERIENCES</h2>
                   </div>
                   <div className='flex flex-row items-center md:gap-5 gap-3 sm:ml-1 md:ml-4 ml-0'>
                        <h1 className='text-white text-3xl sm:text-2xl xmd:text-3xl font-bold'>250</h1>
                        <h2 className='text-caribbeangreen-300 text-semibold text-[12px]'>TYPES OF COURSES</h2>
                   </div>
                  
                </div>

            </div>

        </div>
    )
}

export default Timeline