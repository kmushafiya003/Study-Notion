import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategories } from '../../../../../../services/operations/courseDetailAPI'
import { editCourseDetails } from '../../../../../../services/operations/courseDetailAPI';
import { addCourseDetails } from '../../../../../../services/operations/courseDetailAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import ChipInput from './ChipInput';
import Upload from '../Upload'
import RequirementField from './RequirementField';
import { setStep } from '../../../../../../redux/slices/courseSlice';
import { setCourse } from '../../../../../../redux/slices/courseSlice';
import IconButton from '../../../../../common/IconButton'
import { toast } from 'react-hot-toast'

import { COURSE_STATUS } from '../../../../../../utils/constants';


const CourseInformationForm = () => {



    const dispatch = useDispatch();

    const { course, editCourse } = useSelector((state) => state.course);

    const { token } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);

    const [courseCategories, setCourseCategories] = useState([]);


    //fetch all the avalibale categories

    const getCategories = async () => {

        setLoading(true);

        const categories = await fetchCourseCategories();

        // console.log("Category response : " , categories);

        if (categories.length > 0) {
            // console.log("category ke if mei hai")
            setCourseCategories(categories);
        }

        setLoading(false);

    }

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },

    } = useForm();


    //if user is editing the course then insert the previous value
    useEffect(() => {


        if (editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDescription", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }

        getCategories();
    }, []);



    //function to check the user is updated the form or not

    const isFormUpdated = () => {

        const currentValues = getValues();
        console.log("CurrentValues : ", currentValues);

        if (currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDescription !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString()

        ) {
            return true;
        }

        else {
            return false;
        }

    }


    //handle next(submit) button

    const onSubmit = async (data) => {

        //if user editing the course 

        if (editCourse) {

            //check form is updated or not 

            //if form is updated then follow thw below if condition
            if (isFormUpdated()) {

                //fetch the currentValue of form Data

                const currentValues = getValues();


                //make the new formData
                const formData = new FormData();




                formData.append("courseId", course._id);


                //check which field is updated , if it passes the condition which means field is updated then also update  the formData

                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }

                if (currentValues.courseShortDescription !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDescription);
                }

                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }

                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags));
                }

                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }

                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }

                if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }
                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage);
                }

                console.log("Course FormData : ", formData);


                //now call the editCourse api from backend

                setLoading(true);
                const result = await editCourseDetails(formData, token);


                if (result) {
                    //if data successfully fetched then proceed to 2nd step
                    dispatch(setStep(2));

                    //if data successfully fetched then also update the courseSlice
                    dispatch(setCourse(result));
                }
                setLoading(false);


            }

            //if user doesnt make any change in the form then show the below toaster
            else {
                toast.error("No changes made to the form");

            }

            return;

        }

        // if it comes here , which means user creating the new course

        else {


            //make new formData
            const formData = new FormData();


            //append the formData to value for backend api call

            formData.append("courseName", data.courseTitle);
            formData.append("courseDescription", data.courseShortDescription);
            formData.append("price", data.coursePrice);
            formData.append("tag", JSON.stringify(data.courseTags));
            formData.append("whatYouWillLearn", data.courseBenefits);
            formData.append("category", data.courseCategory);
            formData.append("instructions", JSON.stringify(data.courseRequirements));
            formData.append("thumbnailImage", data.courseImage);
            formData.append("status", COURSE_STATUS.DRAFT);


            console.log("Course FormData : ", formData);


            //now call the  addCourse/createCourse  api from backend


            setLoading(true);
            const result = await addCourseDetails(formData, token);


            if (result) {
                //if data successfully fetched then proceed to 2nd step
                dispatch(setStep(2));

                //if data successfully fetched then also update the courseSlice
                dispatch(setCourse(result));
            }
            setLoading(false);







        }




    }



    return (


        <div className=' flex flex-col  '>

            {/* ---------- form -------------- */}
            <form className='border border-richblack-700  py-6 sm:px-6 px-4 rounded-lg bg-richblack-800 form-style flex flex-col gap-y-8 ' onSubmit={handleSubmit(onSubmit)}>

                {/* ------------------- form content ------------------- */}


                <div className='flex flex-col gap-7'>

                    {/* ------------- course title  -------------- */}

                    <div>
                        <label className='label-style'>
                            <p className='tracking-wide'>Course Title <span className='text-pink-200'>*</span></p>
                            <input
                                type="text"
                                name='courseTitle'
                                placeholder='Enter Course Title'
                                className='bg-richblack-700 py-3 text-[14px] xs:text-[16px] rounded-lg px-3 w-full shadow-sm shadow-richblack-200 tracking-wider'
                                {...register("courseTitle", { required: true })}
                            />
                            {
                                errors.courseTitle && (
                                    <span className='text-sm text-red-100  rounded-md px-3'>
                                        Course Title is Required
                                    </span>
                                )
                            }

                        </label>
                    </div>


                    {/* ------------- course description  -------------- */}

                    <div>
                        <label className='label-style'>
                            <p className='tracking-wide'>Course Short Description <span className='text-pink-200'>*</span></p>
                            <textarea

                                name='courseShortDescription'
                                placeholder='Enter Description'
                                className='min-h-[140px] bg-richblack-700 py-3 rounded-lg px-3 w-full shadow-sm shadow-richblack-200 tracking-wider text-[14px] xs:text-[16px]'
                                {...register("courseShortDescription", { required: true })}
                            />
                            {
                                errors.courseShortDescription && (
                                    <span className='text-sm text-red-100  rounded-md px-3'>
                                        Course Description is Required
                                    </span>
                                )
                            }

                        </label>
                    </div>


                    {/* -------------  price  -------------- */}

                    <div>
                        <label className='label-style relative'>
                            <p className='tracking-wide'>Price <span className='text-pink-200'>*</span></p>
                            <input
                                type="number"
                                name='coursePrice'
                                placeholder='Enter Price'
                                className='bg-richblack-700 py-3 text-[14px] xs:text-[16px] rounded-lg pl-12 pr-3 w-full shadow-sm shadow-richblack-200 tracking-wider'
                                {...register("coursePrice", {
                                    required: {
                                        value: true,
                                        message: "Please Enter Price"
                                    },
                                    valueAsNumber: {
                                        value: true,
                                        message: "Please Enter a Number"
                                    }
                                })}
                            />
                            <HiOutlineCurrencyRupee className='text-richblack-500 text-3xl absolute top-[40px] left-[2%]' />
                            {
                                errors.coursePrice && (
                                    <span className='text-sm text-red-100  rounded-md px-3'>
                                        {errors.coursePrice.message}
                                    </span>
                                )
                            }

                        </label>
                    </div>

                    {/* -------------- category   ----------------- */}

                    <div>
                        <label className='label-style' id='courseCategory'>
                            <p className='tracking-wide'>Course Category <span className='text-pink-200'>*</span></p>
                            <select
                                name="courseCategory"
                                id="courseCategory"
                                defaultValue=""
                                className='bg-richblack-700 py-3 text-[14px] xs:text-[16px] rounded-lg px-3 text-richblack-5 w-full shadow-sm shadow-richblack-200 tracking-wider'
                                {
                                ...register("courseCategory", { required: true })
                                }


                            >
                                <option value="" disabled>Choose a Category</option>
                                {
                                    !loading && courseCategories.map((category, index) => (
                                        <option key={index} value={category?._id}>
                                            {category?.name}
                                        </option>
                                    ))
                                }

                            </select>
                            {
                                errors.courseCategories && (
                                    <span className='text-sm text-red-100  rounded-md px-3'>
                                        Course Category is Required
                                    </span>
                                )
                            }
                        </label>
                    </div>


                    {/* ------------- Tag -------------- */}


                    <ChipInput
                        label="Tags"
                        name="courseTags"
                        placeholder="Enter tags and press enter"
                        register={register}
                        errors={errors}
                        inputClassName='bg-richblack-700 py-3 text-[14px] xs:text-[16px] rounded-lg px-3 text-richblack-5 w-full shadow-sm shadow-richblack-200 tracking-wider'
                        setValue={setValue}
                        getValues={getValues}

                    />


                    {/* --------------- Course Thumbnail --------------- */}

                    {/* create a component for uploading and showing preview of media */}

                    <Upload
                        name="courseImage"
                        label="Course Thumbnail"
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        editData={editCourse ? course.thumbnail : null}


                    />



                    {/* ------------- Benefits of the course  -------------- */}

                    <div>
                        <label className='label-style'>
                            <p className='tracking-wide'>Benefits of the course <span className='text-pink-200'>*</span></p>
                            <textarea
                                name='courseBenefits'
                                placeholder='Enter Benefits of the course'
                                className='min-h-[140px] bg-richblack-700 py-3 rounded-lg px-3 w-full shadow-sm shadow-richblack-200 tracking-wider text-[14px] xs:text-[16px]'
                                {...register("courseBenefits", { required: true })}
                            />
                            {
                                errors.courseBenefits && (
                                    <span className='text-sm text-red-100  rounded-md px-3'>
                                        Benefits of the course are required
                                    </span>
                                )
                            }

                        </label>
                    </div>


                    {/* ----------------  Requirement Field ----------------- */}

                    <RequirementField
                        name="courseRequirements"
                        label="Requirements / Instructions"
                        placeholder="Add requirements / instructions"
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        getValues={getValues}
                        className='bg-richblack-700 py-3 text-[14px] xs:text-[16px] rounded-lg px-3 w-full shadow-sm shadow-richblack-200 tracking-wider'

                    />
                </div>

                {/* ---------------------- buttons ---------------------- */}

                <div className=' flex justify-end gap-x-4'>
                    {
                        editCourse && (
                            <button onClick={() => dispatch(setStep(2))} className='flex items-center  bg-richblack-300 border border-richblack-500 px-3 py-2 rounded-lg tracking-wide text-richblack-900 font-semibold'>
                                Continue Without Saving
                            </button>
                        )
                    }

                    <IconButton customClasses="font-semibold "
                        text={!editCourse ? "Next" : "Save Changes"}
                        type="submit"
                    ></IconButton>




                </div>



            </form>

        </div>

    )
}

export default CourseInformationForm