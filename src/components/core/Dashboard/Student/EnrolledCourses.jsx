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
    <div className='xlg:w-[85%%] xmd:w-[80%] smd:w-[85%] w-[90%] mx-auto flex flex-col gap-8 text-richblack-300'>

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
        ) : !enrolledCourses.length ? (<p>You have not enrolled in any course yet</p>) :
          (
            <div className='border border-richblack-700 rounded-lg'>
              <div className='flex justify-between py-2 px-3 bg-richblack-700 rounded-t-lg text-richblack-50 text-sm'>
                <p className='xs:w-[45%] w-[55%]'>Course Name</p>
                <p className='w-[20%] xs:flex hidden'>Duration</p>
                <p className='xs:w-[20%] w-[30%]'>Progress</p>
              </div>

              {/* -------- Card start honge yaha se ----------- */}


              <div>

                {
                  enrolledCourses.map((course, index) => (
                    <div className='flex justify-between py-3 px-3 border-[1px] border-richblack-700 rounded-b-lg' key={index}>

                      {/* -------- course name -------- */}
                      <div className='flex  xs:w-[45%] w-[55%] gap-x-3 lg:items-center'>
                        <img src={course?.thumbnail} alt={course?.courseName} className='w-[52px] h-[52px]  aspect-square rounded-lg' />
                        <div className='flex flex-col'>
                          <h2 className='text-richblack-5 md:text-[16px] text-sm'>{course?.courseName}</h2>
                          <p className='text-sm text-richblack-300'>
                            {
                              course?.courseDescription.length > 50 ? 
                             `${ course?.courseDescription.slice(0,50)}.... `: 
                              course?.description
                            }

                          </p>
                        </div>
                      </div>

                      {/* -------- course duration ---------- */}
                      <div className='xs:flex hidden w-[20%] pt-4 text-richblack-50 md:text-[16px] text-sm'>
                        2 hr 30 min
                      </div>

                      {/* ---------  course progress ----------- */}
                      <div className='flex-col  xs:w-[20%] w-[30%]  pt-4 '>
                        <p className='text-sm pb-2'>Progress: {course?.progressPercentage || 20}%</p>
                        <ProgressBar
                          completed={course?.progressPercentage || 20}
                          height='8px'
                          bgColor='#06D6A0'
                          baseBgColor='#2C333F'
                          isLabelVisible={false}

                        />

                      </div>
                    </div>
                  ))
                }

              </div>

            </div>
          )


      }


    </div>
  )
}

export default EnrolledCourses