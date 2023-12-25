import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyCourse } from '../../../../../services/operations/studentsFeatureApi'
import { useNavigate } from 'react-router-dom'
import { FaRupeeSign } from "react-icons/fa";

const TotalAmountCard = () => {

  const { totalPrice, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleBuyCourse = () => {

    const courses = cart.map((course) => course._id);
    console.log("Courses to buy (ID) : ", courses);

    // API Integrate :-  Payment gateway tk lekr jayegi
    buyCourse(token, courses, user, navigate, dispatch);



  }


  return (
    <div className='lg:w-[20%] xmd:w-[18%] xs:w-[60%] w-[80%] mx-auto xmd:mx-0 h-max flex flex-col items-center xmd:items-start gap-y-4 xlg:p-6 p-4 rounded-lg bg-richblack-700'>

      <div className='flex flex-col gap-y-2'>
        <p>Total: </p>
        <p className='flex gap-x-1 items-center text-xl text-yellow-50'>
          <FaRupeeSign />
          <span className='font-semibold text-2xl'>
            {totalPrice}
          </span>
        </p>

      </div>


      <div className='w-full flex justify-center'>
        <button
          onClick={handleBuyCourse}
          className='bg-yellow-50 text-richblack-900 font-semibold rounded-lg px-8  py-3'>
          Buy Now
        </button>
      </div>

    </div>
  )
}

export default TotalAmountCard