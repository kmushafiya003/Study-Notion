import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, active , linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center lg:text-[16px] text-[14px] w-max lg:px-6 sm:px-4 px-[6px] py-3 rounded-md font-bold
         ${active ? "bg-yellow-50 text-black ": "bg-richblack-800"}
         hover:scale-95 transition-all duration-300 shadow shadow-richblack-600
        `}>
            {children}
        </div>
    </Link>
  )
}

export default Button