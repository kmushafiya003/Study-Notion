import React from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../../services/operations/profileAPI';
import { useState } from 'react';
import { useEffect } from 'react';
import Spinner from '../../../common/Spinner'
import ProgressBar from "@ramonak/react-progress-bar";



const EnrolledCourses = () => {

  const { token } = useSelector((state) => state.auth);

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {

    try {

     

      const response = await getUserEnrolledCourses(token);

      setEnrolledCourses(response);

    } catch (err) {
      console.log("Unable to fetch Enrolled Courses ");


    }
  }

  useEffect(() => {
    getEnrolledCourses();

  }, [])



  return (
    <div className='xlg:w-[75%] xmd:w-[80%] smd:w-[85%] w-[90%] mx-auto flex flex-col gap-8 text-richblack-300'>

      {/* -------------- head -------------- */}

      <h1 className='text-richblack-5 smd:text-3xl sm:text-2xl xs:text-3xl text-2xl  font-semibold mb-5'>
        Enrolled Courses
      </h1>

      {/* ---------------- content table------------------ */}

      
        {
          !enrolledCourses ? (
            <div className='w-full min-h-[60vh] flex items-center justify-center'>
              <Spinner />
            </div>
          ) :  !enrolledCourses.length ? (<p>You have not enrolled in any course yet</p>) :
          (
            <div>
                 <div>
                     <p>Course Name</p>
                     <p>Duration</p>
                     <p>Progress</p>
                 </div>

                  {/* -------- Card start honge yaha se ----------- */}

                  {
                    enrolledCourses.map((course , index) => (
                      <div className='flex ' key={index}>

                        {/* -------- course name -------- */}
                        <div className='flex '>
                          <img src={course?.thumbnail} alt={course?.courseName} />
                          <div className='flex flex-col'>
                            <h2>{course?.courseName}</h2>
                            <p>{course?. courseDescription}</p>
                          </div>
                        </div>

                        {/* -------- course duration ---------- */}
                        <div>
                          2 hr 30 min
                        </div>

                        {/* ---------  course progress ----------- */}
                        <div className='flex-col'>
                          <p>Progress: {course?.progressPercentage || 0}%</p>
                          <ProgressBar
                           completed={course?.progressPercentage || 0} 
                           height='8px'
                           isLabelVisible={false}

                           />

                        </div>
                      </div>
                    ))
                  }

            </div>
          )
            
          
        }
    

    </div>
  )
}

export default EnrolledCourses