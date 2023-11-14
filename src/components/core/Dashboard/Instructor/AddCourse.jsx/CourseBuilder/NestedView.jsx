import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from 'react-icons/rx'
import { MdEdit } from 'react-icons/md'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { IoMdArrowDropdown } from 'react-icons/io'
import {AiOutlinePlus} from 'react-icons/ai'
import { deleteSection } from '../../../../../../services/operations/courseDetailAPI'
import { deleteSubSection } from '../../../../../../services/operations/courseDetailAPI'

const NestedView = ({ handleChangeEditSectionName }) => {

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setviewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = (sectionId) => {

  }
  const handleDeleteSubSection = (subSectionId, sectionId) => {

  }



  return (
    <div className='mt-4 rounded-lg bg-richblack-700  px-8 py-6'>

      <div>
        {
          course?.courseContent?.map((section) => (

            <details key={section.id} open>

              <summary className='flex items-center justify-between  pb-1 border-b-2 border-richblack-600'>

                <div className='flex items-center gap-x-3  '>

                  <RxDropdownMenu className='text-xl' />
                  <p className='text-richblack-50 text-[16px]'>{section.sectionName}</p>


                </div>

                {/* ------------- group of buttons -------------- */}
                <div className='flex items-center gap-x-3 text-richblack-300 text-xl'>

                  {/* ----------- edit button  ---------- */}
                  <button
                    onClick={handleChangeEditSectionName(section._id, section.sectionName)}
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
                  section?.subSection.map((data) => (

                    <div key={data._id} className='flex items-center justify-between  pb-1 border-b-2 border-richblack-600' >

                      <div className='flex items-center gap-x-3' onClick={() => { setviewSubSection(data) }}>

                        <RxDropdownMenu className='text-xl' />
                        <p className='text-richblack-50 text-[16px]'>{data.title}</p>


                      </div>

                      {/* ------------- group of buttons -------------- */}
                      <div className='flex items-center gap-x-3 text-richblack-300 text-xl'>

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
                              text2: "Selected Lectires will be deleted",
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
                className='flex items-center gap-x-3 text-[16px] text-yellow-50 font-medium'
                onClick={setAddSubSection(section._id)}
                >

                  <AiOutlinePlus />
                  Add Lectures

                </button>
              </div>

            </details>

          ))
        }
      </div>

    </div>
  )
}

export default NestedView