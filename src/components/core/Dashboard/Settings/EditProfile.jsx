import React from 'react'
import { useState, useEffect } from 'react'
import Spinner from '../../../common/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import IconButton from '../../../common/IconButton'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../../../services/operations/settingsAPI'

const genders = ["Male", "Female", "Other"]

const EditProfile = () => {

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors},

  } = useForm();


  const submitProfile = (data) => {
    console.log("formData : ", data);

    try{
      setLoading(true);
      dispatch(updateProfile(token , data ));

      console.log("gaya API mei");



    }catch(err){
      console.log("Error in updating profile");
      console.log(err.message);
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
          <div className='bg-richblack-800 rounded-lg px-2  xxs:px-4  sm:px-4 md:px-6 mmd:px-10 py-6 flex flex-col gap-8' >

            <h2 className='text-richblack-5 md:text-lg text-[16px] font-semibold'>Profile Information</h2>
            <form onSubmit={handleSubmit(submitProfile)} className='flex flex-col gap-6 form-style'>

              <div className='flex flex-col gap-6 form-style '>




                {/* ------------------ FirstName and LastName ------------------------- */}


                <div className='flex xs:flex-row flex-col gap-6 xs:gap-4 mmd:gap-6'>

                  {/* ------------ firstName -------------------- */}
                  <div className='xmd:w-[45%] smd:w-[48%] xs:w-[45%] w-10/12'>
                    <label className='label-style'>
                      <p className='tracking-wide'>First Name</p>
                      <input
                        type="text"
                        name='firstName'
                        placeholder='Enter Firstname'
                        defaultValue={user?.firstName}
                        className='bg-richblack-700 py-2 rounded-lg px-3 shadow-sm shadow-richblack-200 tracking-wide'
                        {...register("firstName", { required: true })}
                      />
                      {
                        errors.firstName && (
                          <span className='text-sm text-red-100  rounded-md px-3'>
                            Please enter first name
                          </span>
                        )
                      }
                    </label>
                  </div>


                  {/* --------------------- lastName ------------------- */}

                  <div className='xmd:w-[45%] smd:w-[48%] xs:w-[45%] w-10/12'>
                    <label className='label-style'>
                      <p className='tracking-wide'>Lastname</p>
                      <input
                        type="text"
                        name='lastName'
                        placeholder='Enter Lastname'
                        defaultValue={user?.lastName}
                        className='bg-richblack-700 py-2 rounded-lg px-3 shadow-sm shadow-richblack-200 tracking-wide'
                        {...register("lastName", { required: true })}
                      />
                      {
                        errors.lastName && (
                          <span className='text-sm text-red-100  rounded-md px-3'>
                            Please enter your Lastname
                          </span>
                        )
                      }

                    </label>
                  </div>



                </div>

                {/* --------------------- DOB and Gender --------------------------------- */}

                <div className='flex xs:flex-row flex-col gap-6 xs:gap-4 mmd:gap-6 '>

                  {/* ---------------------- Dob -------------------- */}
                  <div className='xmd:w-[45%] smd:w-[48%] xs:w-[45%] w-10/12'>
                    <label className='label-style'>
                      <p>Date of Birth</p>
                      <input
                        type="date"
                        name='dateOfBirth'
                        defaultValue={user?.additionalDetails?.dateOfBirth}
                        className='bg-richblack-700 py-2 rounded-lg px-3 shadow-sm shadow-richblack-200 tracking-wide'
                        {...register("dateOfBirth", {
                          required: {
                            value: true,
                            message: "Please Enter Date of Birth"
                          },
                          max: {
                            value: new Date().toISOString().split("T")[0],
                            message: "Date of Birth cannot be in the future"
                          }
                        })}

                      />
                      {
                        errors.dateOfBirth && (
                          <span className='text-sm text-red-100  rounded-md px-3'>{errors.dateOfBirth.message}</span>
                        )
                      }
                    </label>

                  </div>

                  {/* -------------------- Gender ----------------------- */}
                  <div className='xmd:w-[45%] smd:w-[48%] xs:w-[45%] w-10/12'>
                    <label htmlFor='gender' className='label-style'>
                      <p>Gender</p>
                      <select name="gender"
                        id="gender"
                        type="text"
                        defaultValue={user?.additionalDetails?.gender}
                        className='bg-richblack-700 py-3 rounded-lg px-3 shadow-sm shadow-richblack-200 tracking-wide'
                        {...register("gender", { required: true })}>

                        {
                          genders.map((element, index) => {
                            return (
                              <option value={element} key={index}>{element}</option>
                            )

                          })
                        }

                      </select>
                      {
                        errors.gender && (
                          <span className='text-sm text-red-100  rounded-md px-3'>Please Enter Gender</span>
                        )
                      }
                    </label>
                  </div>



                </div>

                {/* --------------------- contact number and about ------------------------------- */}

                <div className='flex xs:flex-row flex-col gap-6 xs:gap-4 mmd:gap-6'>

                  {/* ------------------- contact number --------------------- */}



                  <div className='xmd:w-[45%] smd:w-[48%] xs:w-[45%] w-10/12'>

                    <label htmlFor="contactNum" className='label-style'>
                      <p>Contact Number</p>
                      <input
                        type="tel"
                        name='contactNumber'
                        id='contactNum'
                        placeholder='Enter Contact Number'
                        defaultValue={user?.additionalDetails?.contactNumber}
                        className='bg-richblack-700 py-2 rounded-lg px-3 shadow-sm shadow-richblack-200 tracking-wide'
                        {...register("contactNumber", {
                          required: {
                            value: true,
                            message: "Please Enter Contact Number"
                          },
                          maxLength: {
                            value: 12,
                            message: "Invalid Contact Number"
                          },
                          minLength: {
                            value: 10,
                            message: "Invalid Contact Number"
                          }
                        })}

                      />
                      {
                        errors.contactNumber && (
                          <span className='text-sm text-red-100  rounded-md px-3'>{errors.contactNumber.message}</span>
                        )
                      }
                    </label>

                  </div>

                  {/* ---------------------- about -------------------------------- */}

                  <div className='xmd:w-[45%] smd:w-[48%] xs:w-[45%] w-10/12'>
                    <label htmlFor="about" className='label-style'>
                      <p>About</p>
                      <input
                        type="text"
                        id='about'
                        defaultValue={user?.additionalDetails?.about}
                        placeholder='Enter about Yourself'
                        className='bg-richblack-700 py-2 rounded-lg px-3 shadow-sm shadow-richblack-200 tracking-wide'
                        {...register("about", { required: true })}
                      />
                      {
                        errors.about && (
                          <span className='text-sm text-red-100  rounded-md px-3'>
                            Please write about yourself
                          </span>
                        )
                      }
                    </label>

                  </div>

                </div>

              </div>

               {/* ------------------- Save and Cancel Button -------------------------- */}

              <div className='flex gap-6  justify-end'>

                <IconButton type={"submit"} text={"Save"} customClasses={"bg-blue-100 shadow-sm font-semibold px-6"}>
                </IconButton>

                <button 
                onClick={()=> (
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

export default EditProfile