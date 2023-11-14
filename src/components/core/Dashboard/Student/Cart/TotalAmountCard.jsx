import React from 'react'
import { useSelector } from 'react-redux'
import IconButton from '../../../../common/IconButton'

const TotalAmountCard = () => {

  const {totalPrice , cart} = useSelector((state) => state.cart)

  const handleBuyCourse = () => {

    const courses = cart.map((course) => course._id);
    console.log("Courses to buy (ID) : ", courses);

    //Todo : API Integrate :-  Payment gateway tk lekr jayegi

    

  }


  return (
    <div className='flex flex-col gap-4 p-6 border rounded-lg border-richblack-700 bg-richblack-700'>

      <p>Total: </p>
      <p>{totalPrice}</p>
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