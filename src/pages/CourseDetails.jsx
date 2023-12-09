import React from 'react'
import { buyCourse } from '../services/operations/studentsFeatureApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';





const CourseDetails = () => {

  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {courseId} = useParams();

  

const handleBuyCourse = () => {

  if(token){
      buyCourse(token , [courseId] , user , navigate , dispatch);
      return;
  }
}




  return (
    <div className='flex items-center justify-center mt-20'>
        <button 
        className='bg-yellow-50 px-3 py-3 text-richblack-900 rounded-lg'
        onClick={handleBuyCourse}
        >

            Buy Now
        </button>

     
    </div>
  )
}

export default CourseDetails