import React from 'react'
import ChangeProfile from './ChangeProfile'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const index = () => {
  return (
    <div className='xlg:w-[75%] xmd:w-[80%] smd:w-[85%] w-[90%] mx-auto flex flex-col gap-8 text-richblack-300'>
      <h1 className='text-richblack-5 smd:text-3xl sm:text-2xl xs:text-3xl text-2xl  font-semibold mb-5'>
        Edit Profile
      </h1>

      <ChangeProfile/>
      <EditProfile />
      <UpdatePassword />
      <DeleteAccount />
    </div>
  )
}

export default index