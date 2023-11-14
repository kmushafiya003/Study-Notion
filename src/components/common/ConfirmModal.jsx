import React from 'react'
import IconButton from './IconButton'
import { useRef } from 'react'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'


const ConfirmModal = ({ modalData  , setConfirmationModal }) => {

    const myRef = useRef(null)

    useOnClickOutside(myRef , ()=> setConfirmationModal(null))


    console.log("In the confirm Modal")
    return (
        <div className='fixed inset-0 grid lg:place-items-center justify-center items-start z-[9999] overflow-auto bg-white bg-opacity-10  backdrop-blur-sm  border-4 border-blue-100 text-richblack-5' >

            <div className='mt-64  lg:mt-0  border border-richblack-400 bg-richblue-900 rounded-lg p-8 max-w-[280px] xxs:max-w-[320px] xs:max-w-[400px] flex flex-col gap-4' ref={myRef} onClick={(event) => event.stopPropagation()} >

                <h2 className='xs:text-2xl text-xl font-semibold'>{modalData.text1}</h2>
                <p className='xs:text-[16px] text-sm'>{modalData.text2}</p>

                <div className='flex items-center gap-4'>
                    <IconButton
                        onclick={modalData?.btn1Handler}
                        text={modalData?.btn1Text}
                        customClasses={"bg-pink-400 font-semibold shadow-sm tracking-wide"}
                    />

                    {/* ------------- Cancel Button ---------------- */}

                    <button
                        onClick={modalData.btn2Handler} 
                        className='bg-blue-100 tracking-wide shadow-sm font-semibold py-2 px-2 text-richblack-900  shadow-richblack-500 rounded-lg hover:scale-95 transition-all duration-300 '
                        >
                        {modalData?.btn2Text}

                    </button>

                </div>
            </div>

        </div>
    )
}

export default ConfirmModal