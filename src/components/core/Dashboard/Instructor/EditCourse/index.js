import React from 'react'
import RenderSteps from '../AddCourse.jsx/RenderSteps';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from '../../../../common/Spinner';
import { setEditCourse } from '../../../../../redux/slices/courseSlice';
import { setCourse } from '../../../../../redux/slices/courseSlice';
import { getFullDetailsOfCourse } from '../../../../../services/operations/courseDetailAPI';



const EditCourse = () => {

  console.log("Edit Course mei aa gaye")

  const dispatch = useDispatch();

  const {courseId} = useParams();
 

  const {course} = useSelector((state)=> state.course);
  const [loading , setLoading] = useState(false);
  const {token} = useSelector((state)=> state.auth)


  useEffect(()=> {

  

    const populateCourseDetails = async() => {
      setLoading(true);

      const result = await getFullDetailsOfCourse(courseId , token);

      if(result?.courseDetails){
        dispatch(setEditCourse(true));
        dispatch(setCourse(result?.courseDetails));
      }

      setLoading(false);
      
    }

    populateCourseDetails()

   

  },[]);






  if(loading){
    return(
      <div className="h-[70vh] grid flex-1 place-items-center"><Spinner /></div>
      
    )
  }


  return (
   <div className='w-[90%] xmd:w-[85%] lg:w-[65%] mx-auto flex flex-col ' >

    <h1 className='text-richblack-5 smd:text-3xl sm:text-2xl xs:text-3xl text-2xl  font-semibold mb-8'>
      Edit Course
    </h1>
    <div >
      {
        course ? (<RenderSteps />) : (<h2 className='min-h-[50vh] grid place-items-center text-xl text-richblack-300'>Course Not Found</h2>)
      }
    </div>

   </div>
  )
}

export default EditCourse;