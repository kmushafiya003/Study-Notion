import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../../../../common/IconButton'
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
    <div className='flex flex-col gap-4 p-6 border rounded-lg border-richblack-700 bg-richblack-700'>

      <p>Total: </p>
      <p className='flex gap-x-1 items-center'>
        <FaRupeeSign />
        <span>
          {totalPrice}
        </span>
      </p>
      <div>
        <IconButton
          text="Buy Now"
          onclick={handleBuyCourse}

        >

        </IconButton>
      </div>

    </div>
  )
}

export default TotalAmountCard