import React from 'react'




const handleBuyCourse = () => {

    if(token){
        buyCourse();
    }
}


const CourseDetails = () => {
  return (
    <div className='flex items-center justify-center mt-20'>
        <button 
        className='bg-yellow-50 px-3 py-3 text-richblack-900 rounded-lg'
        onClick={()=> handleBuyCourse()}
        >

            Buy Now
        </button>

     
    </div>
  )
}

export default CourseDetails