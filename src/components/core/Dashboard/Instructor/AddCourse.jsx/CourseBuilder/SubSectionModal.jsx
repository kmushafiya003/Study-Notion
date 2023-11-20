import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast'
import { createSubSection } from '../../../../../../services/operations/courseDetailAPI';
import { updateSubSection } from '../../../../../../services/operations/courseDetailAPI';
import { setCourse } from '../../../../../../redux/slices/courseSlice';
import { IoClose } from "react-icons/io5";
import Upload from '../Upload'
import IconButton from '../../../../../common/IconButton';
import { useRef } from 'react';
import { useOnClickOutside } from '../../../../../../hooks/useOnClickOutside';

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false
}

) => {

  

  const  myRef = useRef(null)




  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,

  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  useOnClickOutside(myRef , () => {
    if(!loading){
      setModalData(null);
      
    }
    return ;
  });



  useEffect(() => {

    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);

    }

  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    }
    else {
      return false;
    }


  }

  const handleEditSubSection = async () => {

    const currentValues = getValues();

    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }

    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("videoFile", currentValues.lectureVideo);
    }

    setLoading(true);

    const result = await updateSubSection(formData, token);

    if (result) {
      
      const updatedCourseContent = course.courseContent.map((section)=> section._id === modalData.sectionId ? result : section);

      const updatedCourse = {...course , courseContent : updatedCourseContent}

      dispatch(setCourse(updatedCourse));
    }

    setModalData(null);

    setLoading(false);

  }

  const onSubmit = async (data) => {

    //if view kr rhe hai

    if (view) {

      return;


    }

    //if edit kr rhe hai
    if (edit) {

      //edit kr rhe hai when chnage hua hai
      if (isFormUpdated) {
        handleEditSubSection();
      }
      // edit kr rhe the lekin koi change nhi hua
      else {
        toast.error("No changes made to the form");
      }

      return;

    }

    // naya subsection create kr rhe hai
    const formData = new FormData();

    formData.append("sectionId", modalData)

    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("videoFile", data.lectureVideo);


    setLoading(true);
    //api call
    const result = await createSubSection(formData, token);

    if (result) {

      const updatedCourseContent = course.courseContent.map((section)=> section._id === modalData ? result : section);

      const updatedCourse = {...course , courseContent : updatedCourseContent}

      dispatch(setCourse(updatedCourse));
    }


    setModalData(null);
    setLoading(false);

  }

  useEffect(()=> {
    console.log("Course : " , course);
  }, [])


  return (
    <div className='fixed inset-0 grid lg:place-items-center justify-center items-start z-[9999] overflow-auto bg-richblack-700 bg-opacity-10  backdrop-blur-sm  border-4 border-blue-100 text-richblack-5'>

      <div className='xmd:min-w-[600px] mmd:min-w-[550px] md:min-w-[520px] sm:min-w-[490px] xs:min-w-[410px] xsm:min-w-[350px] xxs:min-w-[280px] max-w-[280px]  md:py-3 xs:py-5 py-2' ref={myRef}>

        <div className='flex justify-between items-center bg-richblack-600 py-3 px-6 text-lg rounded-t-lg'>
          <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <IoClose />
          </button>

        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='rounded-b-lg text-[16px] leading-[24px] text-richblack-5 placeholder:text-richblack-400 focus:outline-none bg-richblack-800 py-8 md:px-8 sm:px-6 px-5 flex flex-col gap-y-6'>


          {/* ----------------- Lecture Video  ---------------- */}

          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}

          />

          {/* --------------- lecture title --------------- */}

          <div>
            <label className='label-style'>
              <p className='tracking-wide'>Lecture Title <span className='text-pink-200'>*</span></p>
              <input
                type="text"
                name='lectureTitle'
                placeholder='Enter Lecture Title'
                className='bg-richblack-700 py-3 text-[14px] xs:text-[16px] rounded-lg px-3 w-full shadow-sm shadow-richblack-200 tracking-wider'
                {...register("lectureTitle", { required: true })}
              />
              {
                errors.lectureTitle && (
                  <span className='text-sm text-red-100  rounded-md px-3'>
                    Lecture Title is Required
                  </span>
                )
              }

            </label>
          </div>

          {/* ------------------- lecture description ------------ */}

          <div>
            <label className='label-style'>
              <p className='tracking-wide'>Lecture Description <span className='text-pink-200'>*</span></p>
              <textarea

                name='lectureDesc'
                placeholder='Enter Lecture Description'
                className='min-h-[140px] bg-richblack-700 py-3 rounded-lg px-3 w-full shadow-sm shadow-richblack-200 tracking-wider text-[14px] xs:text-[16px]'
                {...register("lectureDesc", { required: true })}
              />
              {
                errors.lectureDesc && (
                  <span className='text-sm text-red-100  rounded-md px-3'>
                    Lecture Description is Required
                  </span>
                )
              }

            </label>
          </div>


          {/* ----------------- submit Button  ------------------------ */}
          

        {
          !view && (
            <div className='flex justify-end items-center'>
               <IconButton 
               type="submit"
               text = {loading ? "Loading..." : edit ? "Save Changes" : "Save"}
               />
            </div>
          )
        }


        </form>



      </div>

    </div>
  )
}

export default SubSectionModal