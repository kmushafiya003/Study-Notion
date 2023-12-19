import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUpSharp } from "react-icons/io5";
import SubSectionAccordian from './SubSectionAccordian'


const CourseAccordianBar = ({ section, isActive, handleActive }) => {

    const contentEl = useRef(null);

    //Accordian State

    const [active, setActive] = useState(false);
    const [sectionHeight, setSectionHeight] = useState(0);


    //check  the current section is active or not 

    useEffect(() => {

        setActive(isActive?.includes(section._id));

    }, [isActive])


    // function for dropdowning of subsection which defines height

    useEffect(() => {
        setSectionHeight(active ? contentEl.current.scrollHeight : 0)
    }, [active])


    return (
        <div className='border border-richblack-600 bg-richblack-700 text-richblack-5'>

            {/* ------------------ sections ----------------------- */}

            <div className='py-4 px-8  cursor-pointer flex justify-between transition-[0.3s]' onClick={() => {
                handleActive(section._id)
            }}>

                {/* --------------- Left side --------------- */}
                <div className="flex items-center gap-2">
                    <i
                        className={
                            isActive.includes(section._id) ? "rotate-180" : "rotate-0"
                        }
                    >
                        <IoChevronDown />
                    </i>

                    <div className='text-[16px] font-medium'>
                        {section?.sectionName}
                    </div>


                </div>

                {/* ------------ Right side  ----------------- */}
                <div className='flex items-center'>
                    <span className='text-yellow-50 text-sm'>
                        {
                            `${section?.subSection?.length || 0} lecture(s)`
                        }
                    </span>
                </div>

            </div>


            {/* ---------------- Subsections ----------------------- */}

            <div
                ref={contentEl}
                className={`relative h-0 overflow-hidden bg-richblack-900  transition-[height] duration-[0.35s] ease-[ease]`}
                style={{
                    height: sectionHeight,
                }}
              
            >
                <div className='text-sm flex flex-col gap-5 font-semibold py-4 px-8'>
                    {
                        section?.subSection?.map((lecture, index) => (

                            <SubSectionAccordian lecture={lecture} key={index}
                            />

                        ))
                    }
                </div>


            </div>

        </div>
    )
}

export default CourseAccordianBar