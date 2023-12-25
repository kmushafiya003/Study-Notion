import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactStars from 'react-rating-stars-component'
import { FiTrash2 } from "react-icons/fi"
import { BsStarFill } from 'react-icons/bs';
import { BsStarHalf } from 'react-icons/bs';
import { BsStar } from 'react-icons/bs';
import { removeFromCart } from '../../../../../redux/slices/cartSlice';
import { GetavgRating } from '../../../../../utils/avgRating'
import RatingStars from '../../../../common/RatingStars';





const CartCourses = () => {

    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // const [avgRating, setAvgRating] = useState(4);



    return (
        <div className='py-6 flex flex-col gap-8 xlg:w-[75%] w-full  '>
            {
                cart.map((course, index) => {

                    const rating = GetavgRating(course?.ratingAndReviews);
                    console.log("Rating : ", rating);

                    return (

                        <div key={index} className='flex xmd:px-6 xs:px-4 px-2 xmd:gap-5 gap-8'>

                            {/* ------- thumbnail ----------- */}

                            <div className='flex lg:flex-row gap-5'>


                                <img src={course?.thumbnail} alt={course.courseName} className='rounded-lg xmd:w-[185px] xs:w-[160px] w-[100px] object-fit ' />


                                {/* --------- courseContent -------------- */}
                                <div className='flex flex-col w-[50%] gap-y-2'>
                                    <h2 className='md:text-lg sm:text-sm xs:text-lg text-sm text-richblack-5 font-medium '>{course?.courseName}</h2>
                                    <p className='md:text-[16px] sm:text-[12px] xs:text-[16px] text-[12px] font-normal '>{course?.category?.name}</p>
                                    <div className='xsm:flex hidden items-center gap-x-3 '>

                                        <p className='text-yellow-100 font-semibold '>
                                            {rating}
                                        </p>


                                        {/* <ReactStars
                                    count={5}
                                    size={18}
                                    edit={false}
                                    activeColor="#E7C009"
                                    emptyIcon={<BsStar/>}
                                    halfIcon={<BsStarHalf/>}
                                    fullIcon={<BsStarFill/>}
                                /> */}

                                        <RatingStars Review_Count={rating} Star_Size={18} />

                                        <p className='text-richblack-400 text-[16px] xlg:flex hidden'>{course?.ratingAndReviews?.length} Ratings</p>


                                    </div>


                                </div>

                            </div>

                            {/* --------- remove button and price ------------ */}
                            <div className='flex flex-col gap-5'>


                                {/* -------- remove button ---------- */}

                                <button className='mmd:bg-richblack-700 mmd:rounded-lg xlg:py-3 xlg:px-3 py-2 px-2 mmd:border border-richblack-700 flex mmd:gap-2 items-center text-pink-200' onClick={() => dispatch(removeFromCart(course._id))}>
                                    <FiTrash2 className='mmd:text-[16px] text-xl'></FiTrash2>
                                    <p className='mmd:flex hidden' >Remove</p>
                                </button>


                                {/* ---------- price ------------ */}

                                <p className='text-yellow-50 text-xl lg:text-2xl font-semibold'>
                                    Rs {course?.price}
                                </p>



                            </div>


                        </div>
                    )
                }
                )
            }

        </div>
    )
}

export default CartCourses