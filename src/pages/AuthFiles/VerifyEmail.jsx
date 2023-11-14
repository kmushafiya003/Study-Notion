import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input';
import { IoIosTimer } from 'react-icons/io'
import { signUp, sendOtp } from '../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi'
import Spinner from '../../components/common/Spinner';
import toast from 'react-hot-toast';

const VerifyEmail = () => {

    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, signupData } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }

        const timer = setTimeout(()=>{
            toast(
                "Kindly check your spam folder , if you not receive mail in your inbox",
                {
                  duration: 3000,
                }
              );
        }, 5000)

        return () => clearTimeout(timer);

    }, []);


    const handleOnSubmit = (events) => {

        console.log("SignupData : ", signupData);

        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,

        } = signupData

        events.preventDefault();

        dispatch(signUp(firstName, lastName, email, password, confirmPassword, accountType, otp, navigate));


    }



    return (
        <div className='w-full min-h-[60vh]  flex justify-center items-center mt-16'>

            {
                loading ? (
                    <Spinner></Spinner>
                ) :
                    (
                        <div className='flex flex-col gap-3 smd:w-[40%] sm:w-[60%] xs:w-[70%] xxs:w-[80%] w-[90%]  sm:px-5  xxs:px-2 py-8'>
                            <h1 className='sm:text-3xl text-2xl font-semibold text-richblack-5 '>Verify email</h1>
                            <p className='text-lg text-richblack-100 sm:text-[16px]'>
                                A verification code has been sent to you. Enter the code below
                            </p>
                            <form onSubmit={handleOnSubmit} className=' flex flex-col gap-5 my-3 px-3 '>
                                {/* ----------------- OTP INPUT ------------------------ */}


                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderInput={(props) => <input {...props}
                                        style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)", }}
                                        className="w-[40px] lg:w-[60px] bg-richblack-800 rounded-[0.5rem] text-richblack-5 text-lg aspect-square text-center outline-none focus:outline-2
                                            focus:outline-yellow-50"
                                    />}
                                    containerStyle={{
                                        justifyContent: "space-between ",
                                        gap: "0 10px",

                                    }}


                                />


                                {/* ----------------- submit button ---------------- */}
                                <button type='submit' className='bg-yellow-50 text-richblack-800 text-[16px] py-2 text-center rounded-lg font-semibold  hover:scale-95 transition-all duration-500'>
                                    Verify email
                                </button>
                            </form>

                            <div className=' flex flex-row items-center px-4 justify-between '>
                                {/* ----------------- Back to Login ----------------- */}
                                <div>
                                    <Link to={"/signup"}>
                                        <div className='back-login'>
                                            <HiArrowNarrowLeft></HiArrowNarrowLeft>
                                            <p>Back to Signup</p>
                                        </div>
                                    </Link>

                                </div>

                                {/* -------------------- Resent otp ----------------------- */}
                                <button onClick={() => dispatch(sendOtp(signupData.email, navigate))}>

                                    <div className='flex items-center gap-2 text-[16px] text-blue-100'>
                                        <IoIosTimer className='text-lg'></IoIosTimer>
                                        <p className='text-[16px]'>Resend it</p>
                                    </div>


                                </button>


                            </div>
                        </div>

                    )
            }

        </div >
    )

}

export default VerifyEmail