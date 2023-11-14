import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import ReactStars from 'react-rating-stars-component'
import { FiTrash2 } from "react-icons/fi"
import {BsStarFill} from 'react-icons/bs';
import {BsStarHalf} from 'react-icons/bs';
import {BsStar} from 'react-icons/bs';
import { removeFromCart } from '../../../../../redux/slices/cartSlice';


const CartCourses = () => {

    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();


    return (
        <div className='py-6 flex flex-col gap-8'>
            {
                cart.map((course, index) => (

                    <div key={index} className='flex px-6 gap-5'>

                        {/* ------- thumbnail ----------- */}

                        
                            <img src={course?.thumbnail} alt={course.courseName} className='rounded-lg'/>

                     
                        {/* --------- courseContent -------------- */}
                        <div className='flex flex-col'>
                            <h2 className='text-lg text-richblack-5 font-medium '>{course?.courseName}</h2>
                            <p className='text-[16px] font-normal '>{course?.category?.name}</p>
                            <div className='flex '>
                                {/* getAverageApi ko connect krna hai  */}
                                <p className='text-yellow-100 font-semibold '>4.5</p>


                                <ReactStars
                                    count={5}
                                    size={18}
                                    edit={false}
                                    activeColor="#E7C009"
                                    emptyIcon={<BsStar/>}
                                    halfIcon={<BsStarHalf/>}
                                    fullIcon={<BsStarFill/>}
                                />

                                <p className='text-richblack-400 text-[16px]'>{course?.ratingAndReviews?.length} Ratings</p>


                            </div>


                        </div>

                        {/* --------- remove button and price ------------ */}
                        <div className='flex flex-col gap-5'>


                            {/* -------- remove button ---------- */}

                            <button className='bg-richblack-700 rounded-lg p-3 border border-richblack-700 flex gap-2 items-center text-pink-200' onClick={()=> dispatch(removeFromCart(course._id))}>
                                <FiTrash2></FiTrash2>
                                <p>Remove</p>
                            </button>


                            {/* ---------- price ------------ */}

                            <p className='text-yellow-50 text-2xl font-semibold'>
                                Rs {course?.price}
                            </p>



                        </div>


                    </div>
                ))
            }

        </div>
    )
}

export default CartCourses