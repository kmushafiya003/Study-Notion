import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { FiTrash2 } from "react-icons/fi"
import ConfirmModal from '../../../common/ConfirmModal'
import { useNavigate } from 'react-router-dom'
import { deleteAccount } from '../../../../services/operations/settingsAPI'

const DeleteAccount = () => {

  const [modal, setModal] = useState(null)

  const { token } = useSelector((state) => state.auth)


  const dispatch = useDispatch();
  const navigate = useNavigate();




  return (
    <div className='relative rounded-lg px-2 xsm:px-4 xs:px-6 md:px-12 py-10 flex xs:flex-row flex-col items-center xs:items-start  gap-4  xs:gap-8  border-pink-700 bg-pink-800 text-richblack-5  '>

      {/* --------Icon -------------- */}

      <div className='h-14 w-14 aspect-square rounded-full bg-pink-700 flex items-center justify-center '>
        <FiTrash2 className='text-3xl text-pink-200'></FiTrash2>
      </div>

      {/* ------------ content --------------- */}

      <div className=' flex flex-col gap-4 items-center xs:items-start'>
        <h2 className='text-xl font-semibold text-'>Delete Account</h2>

        <div className=' text-pink-25 text-sm text-center xs:text-left'>

        <p>Would you like to delete account?</p>
        <p>This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.</p>

        </div>
        

        <button
          className='bg-blue-100 w-max xs:text-lg text-[16px] px-2 xsm:px-4 xs:px-6 md:px-12 py-2 xs:py-3 text-richblack-900 font-semibold  italic rounded-lg'
          onClick={() => {
            setModal({
              text1: "Are You Sure ?",
              text2: "Your Account gets permanently deleted ",
              btn1Text: "Delete",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(deleteAccount(token , navigate)),
              btn2Handler: () => setModal(null),
            })
          }}
        >
          I want to delete my Account
        </button>

      </div>

      {
        modal && (
          <ConfirmModal modalData={modal} setConfirmationModal={setModal}></ConfirmModal>
        )
      }


    </div>
  )
}

export default DeleteAccount