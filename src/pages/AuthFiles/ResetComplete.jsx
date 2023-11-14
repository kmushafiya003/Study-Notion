import React from 'react'
import { useDispatch , useSelector } from 'react-redux'
import Spinner from '../../components/common/Spinner'


const {loading} = useSelector((state)=> state.auth)
const {user} = useSelector((state)=> state.user)

const ResetComplete = () => {
  return (
    <div className='w-full min-h-[60vh]  flex justify-center items-center mt-16 '>
        {
            loading ?
            (
                <Spinner></Spinner>

            ) : (
                <div className='flex flex-col gap-3 lg:w-[40%] md:w-[50%] sm:w-[60%] xs:w-[70%] xxs:w-[80%] w-[90%]  sm:px-5  xxs:px-2 py-8 '>
                <h1 className='sm:text-3xl text-2xl font-semibold text-richblack-5 '>
                  Reset Complete!
                </h1>

                <p className='md:text-lg text-richblack-100  text-[16px]'>
                {
                    `All done! We have sent an email to ${user.email} to confirm`
                }
                </p>

                </div>
            )
        }


    </div>
  )
}

export default ResetComplete