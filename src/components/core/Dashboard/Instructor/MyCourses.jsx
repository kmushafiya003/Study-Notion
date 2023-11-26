import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses, deleteAllCourse } from '../../../../services/operations/courseDetailAPI';
import { useEffect } from 'react';
import IconButton from '../../../common/IconButton';
import { IoMdAdd } from "react-icons/io";
import CoursesTable from './InstructorCourses/CoursesTable';
import { useForm } from 'react-hook-form';
import { AiOutlineDelete } from "react-icons/ai";
import ConfirmModal from '../../../common/ConfirmModal';
import { toast } from 'react-hot-toast'


const MyCourses = () => {

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [modalData , setModalData] = useState(null);
  const [loading , setLoading] = useState(false);

  useEffect(() => {

    const fetchCourses = async () => {

      const result = await fetchInstructorCourses(token);

      if (result) {
        setCourses(result);
      }
    }

    fetchCourses();

    setValue("deleteAll", false);

  }, []);


  const {
    register,
    handleSubmit,
    setValue,
  } = useForm()

  const handleDeleteAll = async() => {
     
    setLoading(true);
    
    await deleteAllCourse(token);

    const result = await fetchInstructorCourses(token);

   console.log("result : " , result);

   setCourses([]);

   setLoading(false);
   setModalData(null);
    
  }


  const deleteSubmitHandler = (data) => {
    
   if(data.deleteAll){
    setModalData({
      text1: "Do you want to delete all the courses",
      text2: "All the data related to all course will be deleted",
      btn1Text: "Delete All",
      btn2Text: "Cancel",
      btn1Handler: !loading ? () => handleDeleteAll() : () => { },
      btn2Handler: () => {
        setModalData(null);
      }

    })
   }else{
      toast.error("Select all courses")
   }


  }

  return (
    <div className='  md:w-[90%] w-[95%] mx-auto flex flex-col gap-8 text-richblack-5  sm:min-h-[70vh] min-h-[50vh]'>

      {/* ----------------- header part  ----------------------- */}
      <div className='flex justify-between items-center'>
        <h1 className='smd:text-3xl md:text-xl text-xl font-semibold text-richblack-5'>My Courses</h1>
        <IconButton
          text="Add Course"
          customClasses="font-semibold"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <IoMdAdd />
        </IconButton>

      </div>

      {/* ------------------ delete all -------------------------- */}

      {
        courses.length > 0 && (
          <form className='border border-blue-200 flex px-8 justify-end items-center gap-x-3' onSubmit={handleSubmit(deleteSubmitHandler )}>

            {/* ----------------- checkbox ----------------- */}

            <input
              type="checkbox"
              id='deleteAll'
              {...register("deleteAll")}
              className='bg-richblack-700 py-3 text-[14px] xs:text-[16px] rounded h-4 w-4 px-3 tracking-wider '
            />

           <button type='submit' className='flex items-center gap-x-2 bg-pink-200 px-3 py-2 rounded-lg tracking-wide font-semibold hover:scale-95 transition-all duration-200 text-richblack-50'>
              <span className='text-lg'>
              <AiOutlineDelete />
              </span>
              Delete All
           </button>
          </form>
        )
      }


      {/* --------------------Courses table -------------------------------- */}

      {
        courses && <CoursesTable courses={courses} setCourses={setCourses} />
      }

      {
        modalData && <ConfirmModal modalData={modalData} setConfirmationModal={setModalData}/>
      }

    </div>
  )
}

export default MyCourses
