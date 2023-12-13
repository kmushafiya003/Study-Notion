import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NestedView from './NestedView'
import IconButton from '../../../../../common/IconButton'
import { BiChevronRight } from 'react-icons/bi'
import { setStep, setEditCourse, setCourse } from '../../../../../../redux/slices/courseSlice'
import { toast } from 'react-hot-toast'
import { updateSection } from '../../../../../../services/operations/courseDetailAPI'
import { createSection } from '../../../../../../services/operations/courseDetailAPI'



const CourseBuilderForm = () => {




  const {

    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },

  } = useForm();



  const dispatch = useDispatch()

  const { course } = useSelector((state) => state.course);

  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  // useEffect(()=> {
  //   console.log("Course : " , course);
  // }, [])



  //submit handler
  const onSubmit = async (data) => {

    console.log("Data of submission of section : ", data);

    setLoading(true);
    let result;


    //if we are editing the section Name
    if (editSectionName) {


      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      )

  

    }

    //if we are creating a new Section
    else {


      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      )
    }

    //update the values

    if (result) {

      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }


    //loading false
    setLoading(false)



  }


  //cancel edit handler
  const cancelEdit = () => {

    setEditSectionName(null);
    setValue("sectionName", "");

  }

  //function to go back to the first step
  const goBack = () => {

    dispatch(setStep(1));
    dispatch(setEditCourse(true));

  }


  //function to go next step
  const goToNext = () => {

    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section");
      return;
    }
    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }

    //if everyhting is good then proceed to nect Step
    dispatch(setStep(3));

  }


  const handleChangeEditSectionName = (sectionId , sectionName) => {

    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);

    setValue("sectionName" , sectionName)

  }


  return (
    <div className=' flex flex-col gap-y-8 border border-richblack-700  py-6 sm:px-6 px-4 rounded-lg bg-richblack-800 form-style tracking-wide '>



      {/* ---------- form -------------- */}
      <form className='  form-style flex flex-col gap-y-8  ' onSubmit={handleSubmit(onSubmit)}>

        <h2 className='text-2xl text-richblack-5 font-semibold'>Course Builder </h2>

        {/* ---------------- add Section ---------------- */}

        <div>

          <label className='label-style' htmlFor="sectionName">
            <p className='tracking-wide'> Section Name <span className='text-pink-200'>*</span></p>
            <input
              type="text"
              id='sectionName'
              name='sectionName'
              placeholder='Add section name'
              className='bg-richblack-700 py-3 text-[14px] xs:text-[16px] rounded-lg px-3 w-full shadow-sm shadow-richblack-200 tracking-wider'
              {...register("sectionName", { required: true })}
            />

          </label>
          {
            errors.sectionName && (
              <span className='text-sm text-red-100  rounded-md px-3'>
                Section name is required
              </span>
            )
          }


        </div>

        {/* --------------- create section button ---------------- */}
        <div className=' flex gap-x-8'>
          <button type='submit' className='flex items-center text-lg gap-x-2 px-2 sm:px-3 py-2 border-2 border-yellow-50 rounded-xl text-yellow-50 tracking-wide ' >

            {
              editSectionName ? "Edit Section Name" : "Create Section"
            }
            <IoMdAddCircleOutline className='text-2xl' />

          </button>
          {
            editSectionName && (
              <button

                onClick={cancelEdit}
                className='tracking-wide underline'>
                Cancel Edit
              </button>
            )
          }
        </div>

      </form>





      {/* --------------- Nested View ------------------- */}

      {
        course?.courseContent?.length > 0 && (

          <NestedView handleChangeEditSectionName = {handleChangeEditSectionName} />

        )

      }



      {/* --------------- Buttons  ------------------- */}
      
      <div className='flex justify-end gap-x-6'>

        {/* ------------- Back Button ------------------ */}

        <button
          onClick={goBack}
          className='rounded-lg cursor-pointer font-semibold flex-items-center sm:text-[16px] text-sm py-2 xxs:px-3 px-2 bg-richblack-600 text-richblack-900'
        >
          Back
        </button>


        {/* --------------- Next or Save Changes Buttonn --------- */}


        <IconButton
          text="Next"
          onclick={goToNext}
          customClasses="font-semibold"
        >
          <BiChevronRight className='font-semibold' />
        </IconButton>

      </div>

    </div>
  )
}

export default CourseBuilderForm