import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from 'react-icons/rx'
import { MdEdit } from 'react-icons/md'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { IoMdArrowDropdown } from 'react-icons/io'
import { AiOutlinePlus } from 'react-icons/ai'
import { deleteSection } from '../../../../../../services/operations/courseDetailAPI'
import { deleteSubSection } from '../../../../../../services/operations/courseDetailAPI'
import SubSectionModal from './SubSectionModal'
import ConfirmModal from '../../../../../common/ConfirmModal'
import { setCourse } from '../../../../../../redux/slices/courseSlice'

const NestedView = ({ handleChangeEditSectionName }) => {

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(()=> {
  //   console.log("Course : " , course);
  // }, [])

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setviewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {

    const result = await deleteSection(
      {
        sectionId,
        courseId: course._id

      },
      token

    );

    if (result) {
      
      dispatch(setCourse((result)));
    }

    setConfirmationModal(null);


  }
  const handleDeleteSubSection = async (subSectionId, sectionId) => {

    const result = await deleteSubSection({sectionId , subSectionId }, token)

    if (result) {

      const updatedCourseContent = course.courseContent.map((section)=> section._id === sectionId ? result : section);

      const updatedCourse = {...course , courseContent : updatedCourseContent}

      dispatch(setCourse(updatedCourse));
    }

    setConfirmationModal(null)

  }



  return (
    <div className='mt-4 rounded-lg bg-richblack-700  xs:px-8 xsm:px-6 px-4 py-6'>


      {/* ---------------- sections -------------------------- */}

      <div className='flex flex-col gap-y-6'>
        {
          course?.courseContent?.map((section) => (

            <details key={section.id} open>

              <summary className='flex items-center justify-between  pb-1 border-b-2 border-richblack-600'>

                <div className='flex items-center gap-x-3  '>

                  <RxDropdownMenu className='text-xl' />
                  <p className='text-richblack-50 xs:text-[16px] text-sm'>{section.sectionName}</p>


                </div>

                {/* ------------- group of buttons -------------- */}
                <div className='flex items-center xs:gap-x-3 gap-x-2 text-richblack-300 xs:text-xl text-[16px]'>

                  {/* ----------- edit button  ---------- */}
                  <button
                    onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                  >
                    <MdEdit />
                  </button>

                  {/* ------------ delete button ----------------- */}
                  <button
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Delete this Section",
                        text2: "All the lectures in this section will be deleted!",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteSection(section._id),
                        btn2Handler: () => setConfirmationModal(null),

                      })
                    }}
                  >


                    <RiDeleteBin5Line />

                  </button>

                  <span>
                    |
                  </span>

                  <IoMdArrowDropdown className='text-xl text-richblack-300' />

                </div>



              </summary>



              {/* ----------------------- SubSection Part (lectures) ------------------------- */}

              <div>


                {
                  section?.subSection?.map((data) => (



                    <div key={data._id} className='flex items-center gap-x-4 justify-between  pb-1 border-b-2  border-richblack-600 md:pl-6 pl-4 py-2' >

                   

                      <div className='flex items-center gap-x-3 cursor-pointer' onClick={() => { setviewSubSection(data) }}>

                        <RxDropdownMenu className='text-xl' />
                        <p className='text-richblack-50 xs:text-[16px] text-[13px]'>{data.title}</p>


                      </div>

                      {/* ------------- group of buttons -------------- */}
                      <div className='flex items-center xs:gap-x-3 gap-x-2 text-richblack-300 text-xl'>

                        {/* ----------- edit button  ---------- */}
                        <button
                          onClick={() => setEditSubSection({ ...data, sectionId: section._id })}
                        >
                          <MdEdit />
                        </button>

                        {/* ------------ delete button ----------------- */}
                        <button
                          onClick={() => {
                            setConfirmationModal({
                              text1: "Delete this Sub Section ",
                              text2: "This lecture will be deleted",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                              btn2Handler: () => setConfirmationModal(null),

                            })
                          }}
                        >


                          <RiDeleteBin5Line />

                        </button>



                      </div>
                    </div>


                  ))
                }


                {/* ---------------- Add Lecture Button ------------- */}

                <button
                  className='flex items-center gap-x-2 xs:text-[16px] text-sm tracking-wide text-yellow-50 font-medium py-2 '
                  onClick={() => setAddSubSection(section._id)}
                >

                  <AiOutlinePlus className='text-lg' />
                  Add Lectures

                </button>

              </div>

            </details>

          ))
        }
      </div>

      {
        addSubSection ?
          (<SubSectionModal
            modalData={addSubSection}
            setModalData={setAddSubSection}
            add={true}
          />) :
          viewSubSection ?
            (<SubSectionModal
              modalData={viewSubSection}
              setModalData={setviewSubSection}
              view={true}


            />) :
            editSubSection ?
              (<SubSectionModal
                modalData={editSubSection}
                setModalData={setEditSubSection}
                edit={true}
              />) :
              (<div></div>)

      }

      {
        confirmationModal && (

          <ConfirmModal modalData={confirmationModal} />

        )
      }

    </div>
  )
}

export default NestedView