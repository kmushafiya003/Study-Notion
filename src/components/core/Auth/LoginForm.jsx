import React from 'react'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { login } from '../../../services/operations/authAPI'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'



const LoginForm = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;


  const changeHandler = (events) => {
    setFormData((prev) => {
      return {
        ...prev,
        [events.target.name]: events.target.value,
      }
    });

  }


  const handleOnSubmit = (events) => {
    events.preventDefault();

    dispatch(login(email , password , navigate));

    //if any error comes , then come here
    setFormData({
    email: "",
    password: "",
    }
      
    )

    
  }


  return (
    <form className=' flex flex-col gap-4 py-4 px-3' onSubmit={handleOnSubmit}>

      {/* ------------------------ email-------------------------------- */}

      <label className='label-style'>
        <p className=' tracking-wide'>Email Address <span className='text-pink-200'>*</span></p>
        <input
          required
          type="email"
          name="email"
          placeholder='Enter email address'
          onChange={changeHandler}
          value={email}
          className='bg-richblack-800 py-3 rounded-lg px-3 shadow-sm shadow-richblack-200 tracking-wide'

        />
      </label >


      {/* --------------------------- password  ---------------------------------- */}
      <label className='label-style relative'>

        <p className='text-[14px] tracking-wide'>Password <span className='text-pink-200'>*</span></p>

        <div className='relative flex flex-col gap-2'>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder='Enter password'
            onChange={changeHandler}
            value={password}
            className='bg-richblack-800 py-3 rounded-lg px-3 w-full shadow-sm shadow-richblack-200 tracking-wide'

          />
          <div className='absolute right-3 top-3 text-2xl text-richblack-300 ' onClick={() => {
            return setShowPassword((prev) => !prev)
          }}>
            {
              showPassword ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)
            }
          </div>
          <Link to="/forgot-password">
          <div className='flex justify-end'>
            <p className='text-blue-100 text-[12px]'>Forgot Password</p>
          </div>
          </Link>

        </div>
      </label>

      {/* ------------------ submit button ------------------------------ */}

      <button type='submit' className='mt-4 bg-yellow-50 text-black py-2 rounded-lg shadow-sm shadow-richblack-200'>
        Login
      </button>


    </form>
  )
}

export default LoginForm