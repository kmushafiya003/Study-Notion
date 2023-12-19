import React from 'react'
import { useSelector } from 'react-redux'
import CartCourses from './CartCourses'
import TotalAmountCard from './TotalAmountCard'

const Cart = () => {

  const { totalItems } = useSelector((state) => state.cart)


  return (
    <div className='xlg:w-[75%] xmd:w-[80%] smd:w-[85%] w-[90%] mx-auto'>
      <h1 className='text-richblack-5 smd:text-3xl sm:text-2xl xs:text-3xl text-2xl  font-semibold mb-5'>My Cart</h1>
      <p className='text-[16px] font-semibold text-richblack-400'>{totalItems} Courses in Cart</p>


      {
        
        totalItems > 0 ? (
          <div className='flex'>
            <CartCourses></CartCourses>
            <TotalAmountCard></TotalAmountCard>
          </div>


        ) : (
          <div className='w-full h-[50vh] flex items-center justify-center border border-pink-300 text-2xl tracking-wide font-semibold text-richblack-5'>
            <p>Your Cart is Empty!</p>
          </div>
                    
                )
      }



    </div>
  )
}

export default Cart