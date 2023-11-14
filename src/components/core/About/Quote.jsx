import React from 'react'
import HighlightText from '../../common/HighlightText'

const Quote = () => {
  return (
    <div className='text-center  lg:text-4xl text-3xl font-semibold mt-8 leading-[52px] px-2 '>
       <span className='text-richblack-600 text-5xl'>" </span>
        We are passionate about revolutionizing the way we learn. Our innovative platform 
        <HighlightText text=" combines technology "></HighlightText> ,  
        <span className=' bg-clip-text text-transparent bg-gradient-to-r from-orange-5 to-orange-100'>
            {" "}
         expertise 
        </span> ,
        and community to create an

        <span className=' bg-clip-text text-transparent bg-gradient-to-r from-orange-5 to-yellow-100'>
        {" "}
            unparralleled educational experience.
        </span>
        <span className='text-richblack-600 text-5xl'>"</span>
        
        
    </div>
  )
}

export default Quote