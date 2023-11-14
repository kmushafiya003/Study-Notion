import React from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import frameImg from '../../../assets/Images/frame.png'


const Template = ({title , desc1 , desc2 , formtype , image }) => {
  return (
    <div className=' lg:w-11/12 w-[95%] mx-auto max-w-maxContent relative flex sm:flex-row flex-col-reverse items-center sm:gap-12 gap-8 mmd:px-4 px-2 pr-3 mt-16 justify-center '>

      {/* ---------------left side -------------------- */}
      <div className={`  smd:w-[45%] sm:w-[50%] xs:w-[80%] w-[95%] mx-auto sm:mx-0 flex flex-col justify-center md::justify-start gap-5 py-10 
      ${
        formtype === "signup" ? "xlg:w-[45%] lg:w-[50%] md:px-1 px-2" : "lg:w-[40%] px-3"
      }
      `}>
        <h1 className='md:text-3xl sm:text-2xl xs:text-3xl text-2xl font-semibold text-white '>
          {title}
        </h1>
        <p className='text-richblack-100 md:text-lg sm:text-[16px] xs:text-lg text-[16px] mt-1'>
         {desc1}
          <span className='text-blue-100 font-edu-sa italic'>{desc2}</span>
        </p>
        <div>
          {
            formtype === "signup" ? <SignupForm></SignupForm> : <LoginForm></LoginForm>
          }
        </div>

      </div>


      {/* ----------------right side ------------------------- */}
      <div className={` lg:w-[40%] smd:w-[45%]  sm:w-[48%] xs:w-[75%] w-[90%]  sm:mx-0 relative 

      ${
        formtype === "signup" ? "sm:flex sm:flex-col " : ""
      }
      `}>

        <img src={frameImg} alt="frameImage" className={`md:absolute sm:relative absolute  md:left-5 left-3  md:top-4 top-3 
        ${
          formtype === "signup" ? "sm:top-0 sm:left-0  " : "sm:top-0 sm:left-0"
        }
        `} />
        <img src={image} alt="loginImage" className='relative z-4' />

        <img src={frameImg} alt="frameImage" className={`hidden sm:relative 
        ${
          formtype === "signup" ? "sm:block md:hidden" : "sm:hidden "
        }
        `} />

            
      </div>

    </div>
  )
}

export default Template