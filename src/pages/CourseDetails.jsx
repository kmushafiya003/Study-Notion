import React, { useEffect, useState } from 'react'
import { buyCourse } from '../services/operations/studentsFeatureApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/operations/courseDetailAPI'
import { GetavgRating } from '../utils/avgRating'
import Spinner from '../components/common/Spinner'
import Error from './Error';
import ConfirmModal from '../components/common/ConfirmModal';
import RatingStars from '../components/common/RatingStars'
import { MdLanguage } from "react-icons/md";
import { formatDate } from '../services/formatDate'
import CourseDetailCard from '../components/core/CourseDetail/CourseDetailCard';
import Footer from '../components/common/Footer'
import CourseAccordianBar from '../components/core/CourseDetail/CourseAccordianBar';

const CourseDetails = () => {

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [response, setResponse] = useState(null);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const [modalData, setModalData] = useState(null);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [isActive, setIsActive] = useState([])


  //fetch courseDetail

  useEffect(() => {

    const getCourseFullDetails = async () => {

      try {
        const result = await fetchCourseDetails(courseId);
        console.log("Result : ", result);
        setResponse(result);


      } catch (err) {
        console.log("Error in calling courseDatils API : ", err);

      }

    }


    getCourseFullDetails();


  }, [courseId]);



  //find average review count

  useEffect(() => {

    const count = GetavgRating(response?.data?.courseDetails?.ratingAndReviews)

    setAvgReviewCount(count);


  }, [response]);



  //find total No. of lectures

  useEffect(() => {

    let lectures = 0;

    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    })

    setTotalNoOfLectures(lectures);



  }, [response]);



  //spinner for loading

  if (loading || !response) {

    return (
      <div className=' min-h-[70vh] flex items-center justify-center'>
        <Spinner />
      </div>

    )
  }


  //Error page for success false

  if (!response.success) {
    return (
      <div>
        <Error />
      </div>
    )
  }


  //function to buy course

  const handleBuyCourse = () => {

    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }

    setModalData({
      text1: "You are not Logged in",
      text2: "Please login to purchase the course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setModalData(null),

    })

  }

  //handle for collapsong sections

  const handleActive = (id) => {
    console.log("Inside handleActive function")
    setIsActive(
      !isActive.includes(id) ?
        isActive.concat(id) :
        isActive.filter((e) => e != id)
    )
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    tag,
    createdAt,

  } = response?.data?.courseDetails;




  return (

    <div className='mt-14 flex flex-col tracking-wide '>

      {/* --------------------  upper part ------------------------- */}

      <div className=' bg-richblack-800 py-14 border border-yellow-200 '>

        {/* ------------------- For large Screen ------------------------------- */}

        <div className='hidden md:flex  w-11/12 mx-auto gap-x-6 border xl:px-8 lg:px-4 px-0  relative'>

          {/* ------------------------ left side  ----------------------------- */}

          <div className='xl:w-[65%] lg:w-[62%] mmd:w-[58%] smd:w-[55%] w-[52%] border border-pink-300 flex flex-col gap-y-4'>

            {/* ------------------- Course Name ---------------------- */}

            <h1 className='text-richblack-5 lg:text-3xl text-2xl font-medium'>{courseName}</h1>

            {/* --------------------- Course Description ---------------------- */}

            <h2 className='text-sm text-richblack-200 font-normal'>{courseDescription}</h2>

            {/* --------------------- Rating and reviews -------------------------- */}

            <div className='flex xmd:flex-row flex-col xmd:gap-x-3 gap-y-3'>

              <div className='flex gap-x-2'>
                <span className='text-yellow-100 xmd:text-lg text-[16px]'>{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span className='text-richblack-25 text-[16px]'>{`(${ratingAndReviews.length} reviews)`}</span>
              </div>

              <span className='text-richblack-25 text-[16px]'>{`${studentsEnrolled.length} students enrolled`}</span>

            </div>


            {/* ------------------------- Instructor --------------------------- */}

            <p className='text-richblack-25 text-[16px] italic'>{`Created by ${instructor.firstName}  ${instructor.lastName}`}</p>

            {/* ------------- Time and Language ---------------------------- */}

            <div className='flex xmd:flex-row flex-col  xmd:gap-x-4 gap-y-3'>

              <p className='text-richblack-25 xmd:text-[16px] text-sm'>
                Created at {formatDate(createdAt)}
              </p>

              <p className='flex items-center gap-x-2 text-richblack-25 xmd:text-[16px] text-sm'>
                <MdLanguage className='text-lg' />
                English
              </p>

            </div>


          </div>

          {/* -----------------------------  right side  ------------------------------------ */}

          <div className=' bg-richblack-600 xl:min-w-[400px] xlg:w-[360px] lg:w-[320px] border border-yellow-200  absolute right-1 rounded-md'>

            <CourseDetailCard course={response?.data?.courseDetails} setModalData={setModalData} handleBuyCourse={handleBuyCourse} modalData={modalData} />

          </div>



        </div>


        {/* ------------------- For Small Screen ----------------------------------- */}
        <div className='flex md:hidden flex-col  w-11/12 mx-auto gap-x-6 border sm:px-8  px-6'>

          {/* ------------------- Thumbnail  ---------------- */}

          <div className='flex items-center justify-center'>

            <img src={thumbnail} alt={courseName} className='max-h-[300px] min-h-[180px] sm:min-w-[500px] object-cover rounded-lg' />

          </div>

         
        </div>

      </div>


      {/* -------------------- lower part --------------------------------- */}

      <div className=' bg-richblack-900 py-4 border border-pink-300'>

        <div className='w-11/12 mx-auto  bg-richblack-900 xl:px-8 lg:px-4 px-0 flex flex-col gap-y-8'>


          {/* -------------- What you will learn section ------------------ */}

          <div className='border border-richblack-700 w-[62%] px-5 py-6 flex flex-col gap-y-4'>
            <h2 className='text-3xl text-richblack-5 font-medium'>
              What You Will Learn
            </h2>
            <div className='text-[16px] text-richblack-50'>
              {whatYouWillLearn}
            </div>
          </div>


          {/* ---------------- Course Content ------------------------------- */}

          <div className='flex flex-col gap-y-3 border border-richblack-700 w-[62%] px-5 '>

            <div className='flex flex-col gap-y-3'>


              <h2 className='text-2xl text-richblack-5 font-semibold'>Course Content</h2>

              <div className='flex justify-between'>
                <div className='flex gap-x-3 items-center text-sm text-richblack-50'>
                  <span>{courseContent.length}  sections</span>
                  <span>{totalNoOfLectures} lectures </span>
                  <span> {response?.data?.totalDuration} total length</span>
                </div>

                <div>
                  <button className='text-sm text-yellow-50' onClick={() => setIsActive([])}>
                    Collapse all Sections
                  </button>

                </div>

              </div>

            </div>



            {/* ---------------- Course accordian Bar ---------------------------- */}

            <div className='py-4'>

                {
                  courseContent?.map((section , index) => (
                    <CourseAccordianBar
                    section={section}
                    isActive={isActive}
                    handleActive={handleActive}
                    key={index}
                     />
                  ))
                }


            </div>

          </div>


          {/* ------------------------- Author  ------------------------------------ */}

          <div className='mb-6  flex flex-col gap-y-3'>
            <h2 className='text-2xl font-semibold text-richblack-5'>Author</h2>

            <div className='flex flex-col gap-y-2'>

              <div className='flex gap-x-2 items-center'>
                <img src={instructor?.image} alt="" className='w-[52px] h-[52px] rounded-full object-cover ' />
                <p className='text-richblack-5 text-[16px] font-medium'>
                  {
                    `${instructor?.firstName} ${instructor?.lastName}`
                  }
                </p>
              </div>
              <div>
                <p className='text-richblack-50 text-sm'>
                  {instructor?.additionalDetails?.about}
                </p>
              </div>


            </div>
          </div>



        </div>

      </div>

      <div>

      </div>

      {/* -----------------------Footer--------------------- */}
      <div className='bg-richblack-800'>
        <Footer></Footer>
      </div>



      {
        modalData &&
        (<ConfirmModal modalData={modalData} setConfirmationModal={setModalData}  > </ConfirmModal>)
      }





    </div>
  )
}




export default CourseDetails