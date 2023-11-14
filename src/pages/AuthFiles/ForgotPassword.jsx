import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {HiArrowNarrowLeft} from 'react-icons/hi'
import { getResetPasswordToken } from '../../services/operations/authAPI';
import Spinner from '../../components/common/Spinner';


const ForgotPassword = () => {

    const [emailSent , setEmailSent] = useState(false);
    const [email , setEmail] = useState("");
    const {loading} = useSelector((state)=> state.auth);
    const dispatch = useDispatch();
   

    const handleOnSubmit = (events) => {
             events.preventDefault()
             dispatch(getResetPasswordToken(email , setEmailSent ))
    }
    

  return (
    <div className='w-full min-h-[60vh]  flex justify-center items-center mt-16'>
         {
           loading ? (
            <Spinner></Spinner>
           ) :
            (
                <div className='flex flex-col gap-3 lg:w-[40%] md:w-[50%] sm:w-[60%] xs:w-[70%] xxs:w-[80%] w-[90%]  sm:px-5  xxs:px-2 py-8 '>
                    <h1 className='sm:text-3xl text-2xl font-semibold text-richblack-5 '>
                        {
                            !emailSent ? "Reset your Password" : "Check Your Email"
                            
                        }
                    </h1>

                    <p className='md:text-lg text-richblack-100  text-[16px]'>
                        {
                            !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                             : `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit} className='flex flex-col gap-6 mt-5'>
                        {
                            !emailSent &&  (
                                <label className='text-richblack-5 flex flex-col gap-3'>
                                    <p className='text-sm'>Email Addess <span className='text-pink-200'>*</span></p>
                                    <input
                                     type="email"
                                     required
                                     name='email'
                                     value={email}
                                     onChange={(e)=> setEmail(e.target.value)}
                                     placeholder='Enter Your Email Address'
                                     className='input-style'
                                      />

                                </label>
                            )
                        }
                        <button type='submit' className='bg-yellow-50 text-richblack-800 text-[16px] py-2 text-center rounded-lg font-semibold  hover:scale-95 transition-all duration-500'>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>

                    <div >
                        <Link to={"/login"}>
                         <div className='back-login'>
                          <HiArrowNarrowLeft></HiArrowNarrowLeft>
                          <p>Back to login</p>
                          </div>
                        </Link>
                    </div>

                </div>
            )
         }
    </div>
  )
}

export default ForgotPassword