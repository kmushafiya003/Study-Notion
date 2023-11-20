import React from 'react'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../../../../common/IconButton';
import { setStep } from '../../../../../../redux/slices/courseSlice';
import { resetCourse } from '../../../../../../redux/slices/courseSlice';
import { COURSE_STATUS } from '../../../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import {editCourseDetails} from  '../../../../../../services/operations/courseDetailAPI'


const PublishCourse = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Course : ", course);

        if (course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true);
        }
    }, []);

    const goToCourse = () => {
        dispatch(resetCourse());
        // navigate("/dashboard/my-courses");
    }

    const handleCoursePublish = async() => {

        //if form is not updated
        if (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true  || 
        (course.status === COURSE_STATUS.DRAFT && getValues("public") === "false")
        ) {
            //no updation in form
            //no need to call API
            goToCourse();
            return;

        }


        // if form is updated

        const formData = new FormData();

        formData.append("courseId" , course._id );

        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT

        formData.append("status" , courseStatus);

        setLoading(true);

        const result = await editCourseDetails(formData , token);

        if(result){
            goToCourse()
        }

        setLoading(false);
    }

    const onSubmit = (data) => {
        handleCoursePublish();
    }

    const goBack = () => {
        dispatch(setStep(2));

    }



    return (
        <div className='rounded-lg border bg-richblack-800 p-6 border-richblack-700 flex flex-col gap-y-5'>

            {/* ---------------- heading  ---------------- */}

            <h2 className='text-2xl font-semibold text-richblack-5'>
                Publish Settings
            </h2>


            {/* ---------------- form -------------------- */}

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-8'>


                {/* ------------------ checkbox ------------------------ */}

                <div>
                    <label htmlFor="public" className='flex gap-x-2 items-center'>


                        <input
                            type="checkbox"
                            id='public'
                            {...register("public")}
                            className='bg-richblack-700 py-3 text-[14px] xs:text-[16px] rounded h-4 w-4 px-3 tracking-wider'
                        />
                        <span className='tracking-wide text-richblack-400 font-medium text-[16px]'> Make this Course as Public </span>
                    </label>
                </div>


                {/* ------------- group of buttons ------------ */}

                <div className='flex justify-end gap-x-6'>

                    <button
                        onClick={goBack}
                        disabled={loading}
                        type='button'
                        className='rounded-lg cursor-pointer font-semibold flex-items-center sm:text-[16px] text-sm py-2 xxs:px-3 px-2 bg-richblack-600 text-richblack-900'
                    >
                        Back
                    </button>

                    <IconButton
                        disabled={loading}
                        type="submit"
                        text="Save Changes"
                        customClasses="font-semibold"
                    />



                </div>

            </form>


        </div>
    )
}

export default PublishCourse;