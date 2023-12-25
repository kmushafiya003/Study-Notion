import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { addToCart } from '../../../redux/slices/cartSlice';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import copy from 'copy-to-clipboard';
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { useEffect } from 'react';






const CourseDetailCard = ({ course,setModalData, handleBuyCourse }) => {

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {
    _id,
    courseName,
    thumbnail,
    price,
    instructions,


  } = course;



  const [cartCourse , setCartCourse] = useState([]);


  useEffect(()=>{

    if(cart){
      const Courses = cart?.map((course) => course._id);
       setCartCourse(Courses);
     
      }

  } , [cart])

 


  const handleAddToCart = () => {

    if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor , you can't buy a course");
      return;
    }

    if (token) {
      dispatch(addToCart(course))
      return;
    }

    setModalData({
      text1: "You are not logged in",
      text2: "Please login to add to cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setModalData(null),
    })


  }

  const handleGoToCart = () => {

    if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor , you can't buy a course");
      return;
    }

    if(token){
       navigate("/dashboard/cart");
    }

    return;

  }

  const handleShare = () => {

    copy(window.location.href);

    toast.success("Link Copied to Clipboard")

  }

 

  return (

    <>

    {/* ------------------ For Large screen  ---------------------- */}

    <div className='md:flex hidden bg-richblack-700 w-full h-full xl:px-6 lg:px-4 px-3 py-3 rounded-md  xlg:gap-y-6 gap-y-4 flex-col '>

      <img src={thumbnail} alt={courseName} className='rounded-xl max-h-[280px] min-h-[180px] xl:w-[380px] xlg:w-[340px] lg:w-[300px] w-[280px] object-cover' />

      <div className='xl:text-3xl lg:text-2xl md:text-xl lg:font-bold font-semibold'>
        Rs. {price}
      </div>

      {/* -------------------- button group --------------------------- */}

      <div className='flex flex-col lg:gap-y-4 md:gap-y-3 '>

        {/* ------------------- Buy Course or Go to Course ---------------------------- */}

        <button
          className='bg-yellow-50 xlg:py-3 py-2 xl:px-6 lg:px-4 px-3 text-richblack-900 font-semibold rounded-lg hover:scale-95 transition-all duration-300'
          onClick={
            user && course?.studentsEnrolled?.includes(user?._id) ?
              () => navigate("/dashboard/enrolled-courses") :
              () => handleBuyCourse()
          }
        >
          {
            user && course?.studentsEnrolled?.includes(user?._id) ? "Go To Course" : "Buy Now"
          }
        </button>
        {/* -------------------- Add to Cart ------------------------ */}


        {
          !course?.studentsEnrolled?.includes(user?._id) && (
            <button className='bg-richblack-900 text-richblack-5 xlg:py-3 py-2 xl:px-6 lg:px-4 px-3 font-semibold rounded-lg hover:scale-95 transition-all duration-300'
              onClick={
                cartCourse?.includes(_id) ? 
                ()=> handleGoToCart() :
                () => handleAddToCart()
              }
            >
           {
            cartCourse?.includes(_id) ? "Go To Cart" : "Add To Cart"
           }
              
            </button>
          )
        }



      </div>

      {/* --------------- Money back line --------------------- */}

      <div className='xmd:flex hidden justify-center '>
        <p className='text-sm text-richblack-25'>
          30-Day Money-Back Guarantee
        </p>
      </div>

      {/* --------------- Course Includes --------------------------- */}

      <div className='hidden xmd:flex flex-col gap-y-3'>
        <h2 className='text-[16px] font-medium'>This course includes:</h2>

        <div className='flex flex-col gap-y-3'>
          {
            instructions?.map((item, index) => (

              <div key={index} className='flex gap-x-2 items-center text-caribbeangreen-100 text-sm font-medium'>

                <FaArrowAltCircleRight />
                <p>{item}</p>

              </div>
            ))
          }

        </div>
      </div>

      {/* -------------------  Share Button  ------------------------- */}

      <div className='flex justify-center'>
        <button className='flex items-center gap-x-1  text-yellow-100 py-2 px-3' onClick={handleShare}>
          <FaShareFromSquare />
          <p>
            Share
          </p>
        </button>
      </div>



    </div>

    {/* ----------------- For small screen  ---------------------- */}

    <div className=' md:hidden flex flex-col gap-y-6'>

    <div className='xs:text-2xl text-xl font-semibold'>
        Rs. {price}
      </div>

      {/* -------------------- button group --------------------------- */}

      <div className='flex flex-col  gap-y-4'>

        {/* ------------------- Buy Course or Go to Course ---------------------------- */}

        <button
          className='bg-yellow-50 xlg:py-3 py-2 xl:px-6 lg:px-4 px-3 text-richblack-900 font-semibold rounded-lg hover:scale-95 transition-all duration-300'
          onClick={
            user && course?.studentsEnrolled?.includes(user?._id) ?
              () => navigate("/dashboard/enrolled-courses") :
              () => handleBuyCourse()
          }
        >
          {
            user && course?.studentsEnrolled?.includes(user?._id) ? "Go To Course" : "Buy Now"
          }
        </button>
        {/* -------------------- Add to Cart ------------------------ */}


        {
          !course?.studentsEnrolled?.includes(user?._id) && (
            <button className='bg-richblack-900 text-richblack-5 xlg:py-3 py-2 xl:px-6 lg:px-4 px-3 font-semibold rounded-lg hover:scale-95 transition-all duration-300'
              onClick={
                cartCourse?.includes(_id) ? 
                ()=> handleGoToCart() :
                () => handleAddToCart()
              }
            >
           {
            cartCourse?.includes(_id) ? "Go To Cart" : "Add To Cart"
           }
              
            </button>
          )
        }



      </div>
         
    </div>

    </>
  )
}


export default CourseDetailCard;

