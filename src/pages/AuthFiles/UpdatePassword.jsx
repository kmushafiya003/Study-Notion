import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useLocation } from 'react-router-dom'
import {HiArrowNarrowLeft} from 'react-icons/hi'
import { resetPassword } from '../../services/operations/authAPI'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/common/Spinner'

const UpdatePassword = () => {

    const { loading } = useSelector((state) => state.auth);
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        password: "",
        confirmPassword: "",
    })

    const { password, confirmPassword } = formData;

    const handleOnChange = (events) => {

        setFormData((prev) => {
            return {
                ...prev,
                [events.target.name]: events.target.value
            }
        })
    }
    const handleOnSubmit = (events) => {
        events.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token , navigate))
    }


    return (
        <div className='w-full min-h-[60vh]  flex justify-center items-center mt-24'>
            {
                loading ? (
                    <Spinner></Spinner>
                ) :
                    (
                        <div className=' flex flex-col gap-3 lg:w-[40%] md:w-[50%] sm:w-[60%] xs:w-[70%] xxs:w-[80%] w-[90%]  sm:px-5  xxs:px-2 py-8'>
                            <h1 className='sm:text-3xl text-2xl font-semibold text-richblack-5 '>Choose new password</h1>
                            <p className='md:text-lg text-richblack-100  text-[16px]'>Almost done. Enter your new password and your all set.</p>

                            <form onSubmit={handleOnSubmit} className='flex flex-col gap-4 mt-5 '>


                                {/* ---------------   Password ------------------- */}
                                <label className='text-richblack-5 flex flex-col gap-3 relative smd:w-[90%]'>
                                    <p className='text-sm'>New password <span  className='text-pink-200'>*</span></p>
                                    <input
                                        type={showPass ? "text" : "password"}
                                        name='password'
                                        value={password}
                                        onChange={handleOnChange}
                                        placeholder='Password'
                                        className='input-style'
                                    />
                                    <span onClick={() => setShowPass((prev) => !prev)} className='absolute text-xl text-richblack-300 right-5 top-12'>
                                        {
                                            showPass ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)
                                        }
                                    </span>

                                </label>


                                {/* -------------------- Confirm Password ------------------ */}

                                <label className='text-richblack-5 flex flex-col gap-3 relative smd:w-[90%]'>
                                    <p className='text-sm'>Confirm new password <span  className='text-pink-200'>*</span></p>
                                    <input
                                        type={showConfirmPass ? "text" : "password"}
                                        name='confirmPassword'
                                        value={confirmPassword}
                                        onChange={handleOnChange}
                                        placeholder='Confirm password'
                                        className='input-style'
                                    />
                                    <span onClick={() => setShowConfirmPass((prev) => !prev)} className='absolute text-xl text-richblack-300 right-5 top-12'>
                                        {
                                            showConfirmPass ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)
                                        }
                                    </span>

                                </label>

                                {/* ---------------------  Reset Password Button ----------------- */}

                                <button type='submit' className='bg-yellow-50 text-richblack-800 text-[16px] py-2 text-center rounded-lg font-semibold  hover:scale-95 transition-all duration-500 smd:w-[90%] mt-5'>
                                    Reset Password
                                </button>

                            </form>
                           
                                  {/* -------------------------  Back to login ------------------------ */}
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

export default UpdatePassword