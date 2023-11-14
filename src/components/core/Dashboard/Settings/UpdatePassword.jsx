import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../../common/Spinner'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import IconButton from '../../../common/IconButton'
import { useNavigate } from 'react-router-dom'
import { changePassword } from '../../../../services/operations/settingsAPI'

const UpdatePassword = () => {

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  // const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const handleOnSubmit = (data) => {

    console.log("Formdata : ", data);

    try {

      dispatch(changePassword(token, data));

    } catch (err) {
      console.log("Submit handler mei api bulane mei error");
    }



  }

  return (
    <div>
      {
        loading ? (
          <div className='min-h-[60vh] flex items-center justify-center w-full'>
            <Spinner />
          </div>
        ) : (
          <div className='bg-richblack-800 rounded-lg px-2  xxs:px-4 sm:px-2 md::px-4 md:px-6 mmd:px-10 py-6 flex flex-col gap-8'>
            <h2 className='text-richblack-5 text-lg '>Password</h2>

            <form onSubmit={handleSubmit(handleOnSubmit)} className='flex flex-col gap-6 form-style'>

              {/* ---------------- Current and New Password ------------------ */}

              <div className='flex sm:flex-row flex-col gap-y-6 justify-between mmd:justify-start mmd:gap-6 '>

                {/* --------------current  Password----------- */}
                <div className='relative xmd:w-[45%]  sm:w-[48%]  w-11/12 '>

                  <label className='label-style'>
                    <p className='tracking-wide'>Current Password </p>
                    <input

                      type={showCurrent ? "text" : "password"}
                      name="oldPassword"
                      placeholder='Enter Current Password '
                      className='bg-richblack-700 py-2 rounded-lg px-3 sm:px-1 md:px-3 shadow-sm shadow-richblack-200 sm:tracking-normal tracking-wide'
                      {...register("oldPassword", { required: true })}

                    />
                    <div className='absolute top-11 z-[10] xmd:right-3 md:right-1 sm:right-0 right-3  md:text-xl text-xl sm:text-lg text-richblack-300 ' onClick={() => setShowCurrent((prev) => !prev)} >
                      {
                        showCurrent ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)
                      }
                    </div>
                    {
                      errors.oldPassword && (
                        <span className='text-sm text-red-100  rounded-md px-3'>
                          Please enter Current Password
                        </span>
                      )
                    }
                    
                  </label >

                </div>

                {/* -----------------new Password --------------------- */}

                <div className='relative xmd:w-[45%]  sm:w-[48%]  w-11/12'>

                  <label className='label-style relative '>
                    <p className='tracking-wide'>New Password </p>
                    <input
                      type={showNew ? "text" : "password"}
                      name="newPassword"
                      placeholder='Enter New Password '
                      className='bg-richblack-700 py-2 rounded-lg px-3 sm:px-2 md:px-3 shadow-sm shadow-richblack-200 md:tracking-wide sm:tracking-normal tracking-wide'
                      {...register("newPassword", { required: true })}

                    />
                     <div className='absolute top-11 z-[10] md:right-3 sm:right-1 right-3 md:text-xl sm:text-lg  text-xl text-richblack-300' onClick={() => setShowNew((prev) => !prev)} >
                      {
                        showNew ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)
                      }
                    </div>
                    {
                      errors.newPassword && (
                        <span className='text-sm text-red-100  rounded-md px-3'>
                          Please enter New Password
                        </span>
                      )
                    }
                   
                  </label >

                </div>

              </div>

              {/* ------------------- Save and Cancel Button -------------------------- */}

              <div className='flex gap-6 justify-end'>

                <IconButton type={"submit"} text={"Update"} customClasses={"bg-blue-100 shadow-sm font-semibold px-4"}>
                </IconButton>

                <button
                  onClick={() => (
                    navigate("/dashboard/my-profile")
                  )}
                  className='bg-richblack-700 px-3 xs:px-4 py-2 rounded-lg font-semibold shadow-sm shadow-richblack-500 hover:scale-95 transition-all duration-300'
                >
                  Cancel
                </button>



              </div>



            </form>

          </div>
        )
      }
    </div>
  )
}

export default UpdatePassword