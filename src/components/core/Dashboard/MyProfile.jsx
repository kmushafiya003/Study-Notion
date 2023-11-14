import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconButton from '../../common/IconButton';
import { BiEditAlt } from 'react-icons/bi'


const MyProfile = () => {

  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <div className=' xlg:w-[75%] xmd:w-[80%] smd:w-[85%] w-[90%] mx-auto flex flex-col gap-8 text-richblack-300 border border-pink-200'>
      <h1 className='text-richblack-5 smd:text-3xl sm:text-2xl xs:text-3xl text-2xl  font-semibold mb-5'>
        My Profile
      </h1>

      {/* ------------ section 1 ------------- */}
      <div className='flex justify-between items-center bg-richblack-800 rounded-lg px-4 xxs:px-8 sm:px-4 md:px-10 py-6'>

        {/* -----------  left side  -------------- */}
        <div className='flex xs:flex-row flex-col gap-4 xs:gap-x-4  xxs:items-center items-start xs:justify-start justify-center   w-[70%] md:gap-x-6 b'>
          <img src={user?.image}
            alt={`profile - ${user?.firstName}`}
            className='aspect-square w-[78px] rounded-full object-cover '
          />

          <div className='flex flex-col gap-[2px] '>
            <h2 className='text-richblack-5 md:text-lg text-[16px] font-semibold text-left xxs:text-center xs:text-left'>{user?.firstName + " " + user?.lastName}</h2>
            <p className='text-[14px]'>{user?.email}</p>
          </div>

        </div>

        {/* --------------  right side ----------------- */}
        <div className='w-max'>

          <IconButton
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <BiEditAlt></BiEditAlt>
          </IconButton>
        </div>

      </div>

      {/* ------------------------------- section 2 ----------------------------- */}

      <div className='bg-richblack-800 rounded-lg flex flex-col gap-5 px-4 xxs:px-8 sm:px-4 md:px-10 py-6'>
        <div className='flex justify-between '>
          <h2 className='text-richblack-5 md:text-lg text-[16px] font-semibold '>About</h2>
          <IconButton
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <BiEditAlt></BiEditAlt>

          </IconButton>

        </div>

        <p className='text-[14px] tracking-wide'>
          {
            user?.additionalDetails?.about ?? "Write Something About Yourself"
          }
        </p>

      </div>

      {/* ------------------------- section 3 ----------------------------------- */}

      <div className='bg-richblack-800 rounded-lg px-4 xxs:px-8 sm:px-4 md:px-10 py-6 flex flex-col gap-8'>
        <div className='flex justify-between '>
          <h2 className='text-richblack-5 md:text-lg text-[16px] font-semibold'>Personal Details</h2>
          <IconButton
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <BiEditAlt></BiEditAlt>

          </IconButton>
        </div>

        <div className='w-full sm:w-[95%] md:w-11/12 xmd:w-10/12  lg:w-9/12 flex xs:flex-col flex-row flex-wrap xs:flex-nowrap  xs:gap-4 gap-x-20 '>
              {/* first */}
              <div className='flex xs:flex-row flex-col xs:justify-between xs:items-center xsm:gap-x-20 '>

                {/* left */}
                <div className=' mb-4 xs:mb-0  '>
                  <p className=' text-richblack-500 text-sm my-1 '>First Name</p>
                  <p className='text-richblack-25 text-[15px] font-semibold'>{user?.firstName}</p>
                </div>

                {/* right */}
                <div className=' xs:w-4/12 mb-4 xs:mb-0'>
                  <p className='text-sm text-richblack-500 my-1 '>Last Name</p>
                  <p className='text-richblack-25 text-[15px] font-semibold'>{user?.lastName}</p>
                </div>
              </div>

              {/* sec */}
              <div className='flex xs:flex-row flex-col xs:justify-between xs:items-center  gap-x-10  ' >
                {/* left */}
                <div className='mb-4 xs:mb-0'>
                  <p className='text-sm text-richblack-500 my-1'>Email</p>
                  <p className='text-richblack-25 text-[15px] font-semibold'>{user?.email}</p>
                </div>

                {/* right */}
                <div className=' xs:w-4/12 mb-4 xs:mb-0'>
                  <p className='text-sm text-richblack-500 my-1'>Phone Number</p>
                  <p className='text-richblack-25 text-[15px] font-semibold'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                </div>
              </div>

              {/* third */}
              <div className='flex xsm:flex-row flex-col xsm:justify-between xs:items-center xs:gap-x-20 gap-x-24 '>
                {/* left */}
                <div className='mb-4 xsm:mb-0'>
                  <p className='text-sm text-richblack-500 my-1 '>Gender</p>
                  <p className='text-richblack-25 text-[15px] font-semibold'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                </div>

                {/* rigth */}
                <div className=' xs:w-4/12'>
                  <p className='text-sm text-richblack-500 my-1'>Date of Birth</p>
                  <p className='text-richblack-25 text-[15px] font-semibold'>{user?.additionalDetails?.dateOfBirth ?? <p>Add Your Birthday</p>}</p>
                </div>

              </div>

        </div>


      </div>


    </div >
  )
}

export default MyProfile