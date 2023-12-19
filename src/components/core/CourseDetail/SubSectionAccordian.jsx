import React from 'react'
import { IoIosVideocam } from "react-icons/io";

const SubSectionAccordian = ({lecture}) => {
  return (
    <div className='flex items-center text-richblack-50 '>
        <div className='flex items-center gap-2 '>
          <IoIosVideocam className='text-lg'/>
          <p>
            {
              lecture?.title
            }
          </p>

        </div>
    </div>
  )
}

export default SubSectionAccordian