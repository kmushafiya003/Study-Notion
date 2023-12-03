import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
import { useState } from 'react'
import { useEffect } from 'react'
import { GetavgRating } from '../../../utils/avgRating'

const CourseCard = ({ course, Height, fullRounded }) => {

  const [avgReviewCount, setAvgReviewCount] = useState(0);

  // console.log("Course : ", course);

  useEffect(() => {
    const count = GetavgRating(course?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);



  return (
    <div className=' py-2 '>
      <Link to={`/courses/${course._id}`}>
        <div className='flex flex-col gap-y-3 bg-richblack-800 rounded-b-xl pb-4'>
          {/* ---------------- course thumbnail ---------------------- */}
          <div>
            <img src={course?.thumbnail} alt={course?.courseName} className={`${Height} w-full object-cover rounded-t-xl`} />
          </div>

          {/* ------------------ course Info ----------------------------- */}
          <div className='flex flex-col gap-y-4 px-4 py-2'>

            <div >

              {/* ---------- course title ----------- */}
              <h2 className='text-[16px] sm:text-lg text-richblack-5'>
                {course?.courseName}
              </h2>

              {/* ---------- Instructor ------------------- */}

              <p className='italic text-sm'>
                {course?.instructor?.firstName} {course?.instructor?.lastName}
              </p>
            </div>

            {/* ------------------- Ratings ------------------ */}

            <div className='flex gap-x-3 text-sm'>
              <p className='text-richblack-5'>{avgReviewCount || 0}</p>
              <RatingStars Review_Count={avgReviewCount} />
              <p className='text-richblack-400'>{course?.ratingAndReviews?.length} Ratings</p>
            </div>

            {/* ----------------- course price ------------------ */}

            <p className='text-richblack-5 text-sm sm:text-lg'>
              Rs. 
              { 
              " " +
                course?.price
              }
            </p>

          </div>
        </div>

      </Link>
    </div>
  )
}

export default CourseCard