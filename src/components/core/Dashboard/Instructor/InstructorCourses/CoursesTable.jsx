import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { COURSE_STATUS } from '../../../../../utils/constants';
import ConfirmModal from '../../../../common/ConfirmModal';
import { MdEdit } from 'react-icons/md'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FaRupeeSign } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { deleteCourse, fetchInstructorCourses } from '../../../../../services/operations/courseDetailAPI';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const CoursesTable = ({ courses, setCourses }) => {


  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(null);
  const TRUNCATE_LENGTH = 20;


  const handleCourseDelete = async (courseId) => {
    setLoading(true);

    await deleteCourse({ courseId: courseId }, token);

    const result = await fetchInstructorCourses(token);

    if (result) {
      setCourses(result);
    }

    setLoading(false);

    setModalData(null)
  }


  //make a function to delete all the course by using chcekbox (which work as a select all)

  return (
   <>
    {
      courses.length === 0 && (
        <div>

        </div>
      )
    }

      <Table className="rounded-xl border border-richblack-800 ">

        {/* -------- Table Heading --------------- */}
        <Thead >
          <Tr className="flex gap-x-10 flex-row  rounded-t-md border-b border-b-richblack-800 px-6 py-2 ">
            <Th className="just:flex-1 just:text-left text-sm font-medium uppercase text-richblack-100">Courses</Th>
            <Th className=" just:text-left text-sm font-medium uppercase text-richblack-100 inline  just:hidden lg:inline">Duration</Th>
            <Th className=" just:text-left text-sm font-medium uppercase xs:text-richblack-100 inline just:hidden lg:inline" >Price</Th>
            <Th className=" just:text-left text-sm font-medium uppercase text-richblack-100  ">Actions</Th>
          </Tr>
        </Thead>


        {/* ------------ Table body ---------------- */}
        <Tbody className=" ">
          {
            // ----------- If no courses made by instructor ---------------
            courses.length === 0 ? (
              <Tr className=" flex items-center justify-center h-[40vh]  ">
                <Td className="text-xl font-semibold sm:mt-0 mt-40 ">
                  No Courses Found
                </Td>
              </Tr>
            ) :
              (
                // ----------- If  courses present ---------------
                courses?.map((course) => (

                  <Tr key={course._id} className="flex gap-x-10 py-8 xlg:px-8 md:px-6 px-4 just:mb-0 mb-8 border border-richblack-800" >

                    {/* ---------- Course Data  --------------- */}
                    <Td className="flex gap-x-4 xl:min-w-[65%] xlg:min-w-[60%] lg:min-w-[55%] xmd:min-w-[80%] mmd:min-w-[75%] md:min-w-[73%]  ">

                      {/* ---------- Course thumbnail ------------- */}
                      <img src={course.thumbnail} alt={course.courseName} className='h-[150px] w-[220px] rounded-lg just:mb-0 mb-3 ' />

                      {/* ------------ Course Data  ------------------- */}

                      <div className='flex flex-col gap-y-3'>
                        <h2 className='lg:text-xl text-[16px] text-richblack-5 font-semibold'>{course.courseName}</h2>
                        <p className='text-sm text-richblack-100'>
                          {
                            course.courseDescription.split(" ").length > TRUNCATE_LENGTH ?
                              course.courseDescription.split(" ").splice(0, TRUNCATE_LENGTH).join(" ") + "...." :
                              course.courseDescription
                          }</p>
                        <p className='text-[12px] text-richblack-25'>Created: { }</p>
                        {
                          course.status === COURSE_STATUS.DRAFT ? (
                            <p className='flex items-center gap-x-[6px] text-pink-100 bg-richblack-700 py-1 px-2 rounded-[200px] w-max text-[12px] tracking-wide'>
                              <span className='text-[16px]'><IoTime /></span>
                              Drafted
                            </p>
                          ) : (
                            <p className='flex items-center gap-x-[6px] text-yellow-100 bg-richblack-700 py-1 px-2 rounded-[200px] w-max text-[12px] tracking-wide'>
                              <span className='text-[16px]'><FaCircleCheck /></span>
                              Published
                            </p>
                          )
                        }
                      </div>
                    </Td>

                    {/* -------------- Course Duration  ---------------- */}

                    <Td className="text-sm text-richblack-100  lg:min-w-[80px] just:my-0 my-6 inline just:hidden lg:inline">
                      2 hr 30 min

                    </Td>

                    {/* ----------- Course Price  --------------------------------- */}

                    <Td>
                      <p className='flex just:hidden lg:flex  items-center gap-x-1 text-sm text-richblack-100 font-medium just:my-0 my-6'>
                        <span><FaRupeeSign /></span>
                        {course.price}

                      </p>
                    </Td>

                    {/* ---------------- Course Actions ------------------------- */}

                    <Td>

                      <div className='flex flex-row just:flex-col md:flex-row gap-y-4 gap-x-[10px] items-center text-xl text-richblack-400 '>

                        {/* ----------- Edit Button  ---------- */}
                        <button
                          onClick={() => {
                            navigate(`/dashboard/edit-course/${course._id}`)
                          }}
                          title="Edit"
                          className='hover:text-caribbeangreen-300'
                        >
                          <MdEdit  />
                        </button>

                        {/* -------------- Delete button ------------ */}

                        <button
                          disabled={loading}
                          onClick={() => {
                            setModalData({
                              text1: "Do you want to delete this course",
                              text2: "All the data related to this course will be deleted",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => { },
                              btn2Handler: () => {
                                setModalData(null);
                              }

                            })
                          }}
                          title="Delete"
                          className='hover:text-pink-400'
                        >
                          <RiDeleteBin5Line />
                        </button>

                      </div>
                    </Td>


                  </Tr>
                ))
              )
          }
        </Tbody>
      </Table>

      {
        modalData && (
          <ConfirmModal modalData={modalData} setConfirmationModal={setModalData} />
        )
      }

</>
  )
}

export default CoursesTable;