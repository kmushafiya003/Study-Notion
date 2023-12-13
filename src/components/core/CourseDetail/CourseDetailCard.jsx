import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { addToCart } from '../../../redux/slices/cartSlice';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import copy from 'copy-to-clipboard';
import { ACCOUNT_TYPE } from '../../../utils/constants'






const CourseDetailCard = ({ course,setModalData, handleBuyCourse }) => {

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {
    courseName,
    thumbnail,
    price,
    instructions,


  } = course;





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

  const handleShare = () => {

    copy(window.location.href);

    toast.success("Link Copied to Clipboard")

  }


  return (
    <div className='bg-richblack-700 w-full h-full px-6 py-3 rounded-md flex gap-y-6 flex-col'>

      <img src={thumbnail} alt={courseName} className='rounded-xl max-h-[300px] min-h-[180px] w-[400px] object-cover' />

      <div className='text-3xl font-bold'>
        Rs. {price}
      </div>

      {/* -------------------- button group --------------------------- */}

      <div className='flex flex-col gap-y-4 '>

        {/* ------------------- Buy Course or Go to Course ---------------------------- */}

        <button
          className='bg-yellow-50 py-3 px-6 text-richblack-900 font-semibold rounded-lg'
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
            <button className='bg-richblack-900 text-richblack-5 py-3 px-6  font-semibold rounded-lg'
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          )
        }



      </div>

      {/* --------------- Money back line --------------------- */}

      <div className='flex justify-center'>
        <p className='text-sm text-richblack-25'>
          30-Day Money-Back Guarantee
        </p>
      </div>

      {/* --------------- Course Includes --------------------------- */}

      <div className='flex flex-col gap-y-3'>
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
        <button className='flex items-center gap-x-1  text-yellow-100 py-3 px-3' onClick={handleShare}>
          <FaShareFromSquare />
          <p>
            Share
          </p>
        </button>
      </div>



    </div>
  )
}


export default CourseDetailCard;

