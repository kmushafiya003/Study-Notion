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
import { toast } from 'react-hot-toast'
import { MdLanguage } from "react-icons/md";
import { formatDate } from '../services/formatDate'
import CourseDetailCard from '../components/core/CourseDetail/CourseDetailCard';


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

    const count = GetavgRating(response?.data[0]?.ratingAndReviews)

    setAvgReviewCount(count);


  }, [response]);



  //find total No. of lectures

  useEffect(() => {

    let lectures = 0;

    response?.data[0]?.courseContent?.forEach((sec) => {
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

  } = response?.data[0];




  return (

    <div className='mt-14 flex flex-col tracking-wide'>

      {/* --------------------  upper part  ------------------------- */}

      <div className=' bg-richblack-800 py-14 '>

        <div className='w-11/12 mx-auto flex gap-x-6 border px-8 relative'>

          {/* ------------------------ left side  ----------------------------- */}

          <div className='w-[65%] border border-pink-300 flex flex-col gap-y-4'>

            <h1 className='text-richblack-5 text-3xl font-medium'>{courseName}</h1>

            <h2 className='text-sm text-richblack-200 font-normal'>{courseDescription}</h2>

            <div className='flex gap-x-3'>

              <div className='flex gap-x-2'>
                <span className='text-yellow-100 text-lg'>{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span className='text-richblack-25 text-[16px]'>{`(${ratingAndReviews.length} reviews)`}</span>
              </div>

              <span className='text-richblack-25 text-[16px]'>{`${studentsEnrolled.length} students enrolled`}</span>

            </div>

            <p className='text-richblack-25 text-[16px]'>{`Created by ${instructor.firstName}  ${instructor.lastName}`}</p>

            <div className='flex gap-x-4'>

              <p className='text-richblack-25 text-[16px]'>
                Created at {formatDate(createdAt)}
              </p>

              <p className='flex items-center gap-x-2 text-richblack-25 text-[16px]'>
                <MdLanguage className='text-lg' />
                English
              </p>

            </div>


          </div>

          {/* -----------------------------  right side  ------------------------------------ */}

          <div className='border border-yellow-200 bg-richblack-700 min-w-[420px] w-[25%]'>

            <CourseDetailCard course={response?.data[0]} setModalData={setModalData} handleBuyCourse={handleBuyCourse} modalData={modalData} />

          </div>



        </div>

      </div>


      {/* -------------------- lower part --------------------------------- */}

      <div >

        <div className='w-10/12 mx-auto border'>
           

        </div>

      </div>


      {
        modalData &&
        (<ConfirmModal modalData={modalData} setConfirmationModal={setModalData}  > </ConfirmModal>)
      }


    </div>
  )
}




export default CourseDetails