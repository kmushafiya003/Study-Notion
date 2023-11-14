import React from 'react'
import CTAButton from '../../common/Button';
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({
  position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor ,
}) => {

  return (
  
    
      <div className={`flex ${position} md:my-20 my-12  lg:gap-20 md:justify-center 
       md:gap-10 sm:gap-8 gap-5 relative  px-0 md:px-5
      `}>

        {/* -------------------------Section 1 ------------------------ */}
        <div className='md:w-[45%] sm:w-[80%] w-[90%] mx-auto md:mx-0 flex flex-col gap-6'>

          {heading}

          <p className='lg:text-lg text-center lg:text-left text-[16px] font-bold text-richblack-300 leading-6 '>
            {subheading}
          </p>
          <div className='flex gap-7 mt-10 justify-center md:justify-start'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
              <div className='flex gap-2 items-center'>
                {ctabtn1.text}
                <FaArrowRight></FaArrowRight>
              </div>
            </CTAButton>

            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>

              {ctabtn2.text}

            </CTAButton>

          </div>
        </div>

        {/* ----------------------------Section 2----------------------------- */}

        <div className={`md:w-[42%]  flex flex-row py-4 relative ${backgroundGradient} shadow shadow-richblack-600  sm:w-[80%] w-[90%] mx-auto md:mx-0`}>
          


          <div className={` text-center  flex flex-col w-[10%] text-richblack-400 font-inter font-bold`}>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p className='sm:hidden block'>12</p>
          </div>
          <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} `} >
            <TypeAnimation
              sequence={[codeblock, 5000, ""]}
              repeat={Infinity}
              cursor={true}
              style={
                {
                  whiteSpace: "pre-line",
                  display: "block"
                }
              }
              omitDeletionAnimation={true}

            />


          </div>

        </div>


      </div>
   
  )
}

export default CodeBlocks