import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
import { useState } from 'react'
import { useEffect } from 'react'
import {GetavgRating} from '../../../utils/avgRating'

const CourseCard = ({course , Height}) => {

const [avgReviewCount , setAvgReviewCount] = useState(0);

// console.log("Course : ", course);

useEffect(()=> {
     const count = GetavgRating(course?.ratingAndReviews);
     setAvgReviewCount(count);
}, [course]);



  return (
    <div className='border border-pink-400'>
      <Link to={`/courses/${course._id}`}>
        <div>
          {/* ---------------- course thumbnail ---------------------- */}
          <div>
            <img src={course?.thumbnail} alt={course?.courseName} className={`${Height} w-full rounded-xl object-cover`}/>
          </div>

          {/* ------------------ course Info ----------------------------- */}
          <div>

            {/* ---------- course title ----------- */}
            <h2>
              {course?.courseName} 
            </h2>

            {/* ---------- Instructor ------------------- */}

            <p>
             {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
          </div>

           {/* ------------------- Ratings ------------------ */}

           <div>
              <p>{avgReviewCount || 0}</p>
              <RatingStars Review_Count={avgReviewCount} />
              <p>{course?.ratingAndReviews?.length} Ratings</p>
           </div>

           {/* ----------------- course price ------------------ */}

           <p>
            {
              course?.price
            }
           </p>
        </div>
      </Link>
    </div>
  )
}

export default CourseCard