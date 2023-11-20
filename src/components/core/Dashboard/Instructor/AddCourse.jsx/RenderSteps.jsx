import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from 'react-icons/fa'
import CourseInformationForm from './CourseInformation/CourseInformationForm'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import PublishCourse from './PublishCourse/index'

const RenderSteps = () => {

    const { step } = useSelector((state) => state.course)

    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder"
        },
        {
            id: 3,
            title: "Publish"
        },
    ]

    return (
        <div className='flex flex-col border-2 border-yellow-400 gap-7'>

            {/* --------------- steps ------------------------ */}
            <div className='xs:block hidden'>
                <div className='flex  justify-center'>

                    {
                        steps.map((item) => (

                            //I add this bcoz i have to give the key , without these I have two child
                            <React.Fragment key={item.id}>
                                {/* ----------- number ------------- */}

                                <div >

                                    <div className={` ${step === item.id ?
                                        "bg-yellow-900 border border-yellow-50 text-yellow-50" :
                                        "border border-richblack-700 bg-ricblack-800 text-richblack-300"}
                                        w-[34px] h-[34px] rounded-full flex justify-center items-center
                                        ${step > item.id && "bg-yellow-50 text-yellow-50"
                                        }
                                    `}>
                                        {
                                            step > item.id ? (<FaCheck className='text-richblack-900' />) : (
                                                <span>{item.id}</span>
                                            )
                                        }

                                    </div>


                                </div>

                                {/* ---------------- dashes  ----------------- */}

                                {
                                    item.id !== steps.length && (

                                        <div className={`h-[calc(34px/2)] w-[28%] border-dashed border-b-2
                                                   ${step > item.id ? "border-yellow-50" : "border-richblack-500"
                                            }
                                                   `}>

                                        </div>
                                    )
                                }


                            </React.Fragment>
                        ))
                    }



                </div>

                {/* ---------------  course title  -----------------
                <div className='flex  gap-[162px] pl-3 mt-2'>
                    {
                        steps.map((item) => (
                            <div key={item.id} className={`${
                                step === item.id ? "text-richblack-5" : "text-richblack-300"
                            } text-sm ` }>
                                <p>
                                    {item.title}
                                </p>

                            </div>
                        ))
                    }
                </div> */}


                {/* ---------------  course title  ----------------- */}
                <div className=' grid grid-cols-3 mt-2'>
                    {
                        steps.map((item) => (
                            <div key={item.id} className={`${step === item.id ? "text-richblack-5" : "text-richblack-300"
                                } text-sm  flex justify-center`}>
                                <p>
                                    {item.title}
                                </p>

                            </div>
                        ))
                    }
                </div>

            </div>

            {/* when width is less than 500 */}


            <div className='xs:hidden flex items-center justify-center'>

                {
                    steps.map((item) => (

                        <div key={item.id} className='flex flex-col gap-2 items-center justify-center'>
                            <div className={` ${step === item.id ?
                                "bg-yellow-900 border border-yellow-50 text-yellow-50 " :
                                "hidden"}
                            w-[34px] h-[34px] rounded-full flex justify-center items-center
                            
                        `}>
                                {item.id}


                            </div>

                            <div key={item.id} className={`${step === item.id ? "text-richblack-5" : "hidden"
                                } text-sm  flex justify-center`}>
                                <p>
                                    {item.title}
                                </p>

                            </div>
                        </div>
                    ))
                }

            </div>


            {/* ----------------- form (adding course)  ----------------- */}
            {
                step === 1 && (
                    <CourseInformationForm />
                )
            }
            {
                step === 2 && (
                    <CourseBuilderForm />
                )
            }
            {
             step === 3 && (
                <PublishCourse />
             )
            }

        </div>
    )
}

export default RenderSteps