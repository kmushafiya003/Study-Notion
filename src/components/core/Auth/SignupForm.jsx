import React from 'react'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import Tab from '../../common/Tab'
import {setSignupData} from '../../../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import {toast} from 'react-hot-toast'
import { sendOtp } from '../../../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR

    }
  ]

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const changeHandler = (events) => {
    setFormData((prev) => {
      return {
        ...prev,
        [events.target.name]: events.target.value
      }
    })
  }

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOnSubmit = (events) => {
    events.preventDefault();
   
    if(password !== confirmPassword){
      console.log("Password not match in SIgnup");
      toast.error("Password not matched with Confirm password");
      return ;
    }

    const signupData = {
      ...formData ,
      accountType,
    }

    dispatch(setSignupData(signupData));
 

    dispatch(sendOtp(formData.email , navigate));

    setFormData({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    })

    setAccountType(ACCOUNT_TYPE.STUDENT);

  }

  return (
    <div >
      <Tab tabData={tabData} accountType={accountType} setAccountType={setAccountType}></Tab>
      <form className=' mt-6 flex flex-col gap-6 py-4 xlg:px-3 px-0  form-style' onSubmit={handleOnSubmit}>

        {/* ------------- firstName and LastNAme ----------------------- */}
        <div className='flex md:flex-row flex-col xlg:gap-3 gap-2 '>

          {/* -------------- firstName----------- */}
          <div className='lg:w-[45%] md:w-[48%]'>

            <label className='label-style'>
              <p className='tracking-wide'>First name <span className='text-pink-200'>*</span></p>
              <input
                required
                type="text"
                name="firstName"
                placeholder='Enter first name'
                onChange={changeHandler}
                value={firstName}
                className='bg-richblack-800 py-2 rounded-lg px-3 shadow-sm shadow-richblack-200 tracking-wide'

              />
            </label >
          </div>

          {/* ----------------- lastName --------------------- */}

          <div className='lg:w-[45%] md:w-[48%]'>
            <label className='label-style'>
              <p className=' tracking-wide'>Last name <span className='text-pink-200'>*</span></p>
              <input
                required
                type="text"
                name="lastName"
                placeholder='Enter last name'
                onChange={changeHandler}
                value={lastName}
                className='bg-richblack-800 py-2 rounded-lg px-3 shadow-sm shadow-richblack-200 tracking-wide'

              />
            </label >

          </div>

        </div>

        {/* ---------------- Email Address ------------------------ */}
        <div className='lg:w-[90%] w-[98%]'>
          <label className='label-style'>
            <p className=' tracking-wide'>Email Address <span className='text-pink-200'>*</span></p>
            <input
              required
              type="email"
              name="email"
              placeholder='Enter email address'
              onChange={changeHandler}
              value={email}
              className='bg-richblack-800 py-2 rounded-lg px-3 shadow-sm shadow-richblack-200 tracking-wide'

            />
          </label >

        </div>

        {/* ---------------- Password and Confirm Password ------------------ */}
        <div className='flex md:flex-row flex-col xlg:gap-3 gap-2'>

          {/* -------------- Password----------- */}
          <div className='lg:w-[45%] md:w-[48%]'>

            <label className='label-style relative'>
              <p className='tracking-wide'>Password <span className='text-pink-200'>*</span></p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder='Password '
                onChange={changeHandler}
                value={password}
                className='bg-richblack-800 py-2 rounded-lg px-3 shadow-sm shadow-richblack-200 tracking-wide'

              />
              <div className='absolute top-11 right-3 text-xl text-richblack-300' onClick={() => setShowPassword((prev) => !prev)} >
                {
                  showPassword ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)
                }
              </div>
            </label >

          </div>

          {/* -----------------confirm Password --------------------- */}

          <div className='lg:w-[45%] md:w-[48%]'>

            <label className='label-style relative'>
              <p className='tracking-wide'>Confirm Password <span className='text-pink-200'>*</span></p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder='Confirm password'
                onChange={changeHandler}
                value={confirmPassword}
                className='bg-richblack-800 py-2 rounded-lg px-3 shadow-sm shadow-richblack-200 tracking-wide'

              />
              <div className='absolute top-11 right-3 text-xl text-richblack-300' onClick={() => setShowConfirmPassword((prev) => !prev)} >
                {
                  showConfirmPassword ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)
                }
              </div>
            </label >

          </div>

        </div>

        {/* ----------------- submit button ---------------------- */}
        <button type='submit' className='lg:w-[90%] w-[98%] bg-yellow-50 mt-4 text-black py-2 rounded-lg shadow shadow-richblack-200'>
          Create Account
        </button>

      </form>

    </div>
  )
}

export default SignupForm