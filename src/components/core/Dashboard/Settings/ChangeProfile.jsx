import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../../common/Spinner'
import { useRef } from 'react';
import IconButton from '../../../common/IconButton';
import { FiUpload } from "react-icons/fi"
import { updateDisplayPicture } from '../../../../services/operations/settingsAPI';

const ChangeProfile = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const fileRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);


    const ClickHandler = () => {
        // we can hover the refernce element by clicking on the given button

        fileRef.current.click();

    }


    const fileChangeHandler = (event) => {


        const file = event.target.files[0]

        console.log("File : ", file);

        if (file) {
            console.log("Inside If");
            setImageFile(file);
            previewFile(file);
        }


    }

    const previewFile = (file) => {

        const reader = new FileReader();
        // console.log("Reader before : " , reader);

        reader.readAsDataURL(file);

        // console.log("Reader after : " , reader);
        // console.log("Reader Result : " , reader.result);

        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }

    }

    const fileUploadHandler = () => {

        // console.log("Upload Handler ke andr hai");



        try {

            setLoading(true);

            // console.log("Image File : ", imageFile);

            // var formData = new FormData();
            const formData = new FormData()

            formData.append("displayPicture", imageFile);


            dispatch(updateDisplayPicture(token, formData)).then(() => {
                setLoading(false)
            })




        } catch (err) {
            console.log("Error AA gaya file uploader mei : ", err);
            console.log(err.message)
        }


    }


    // yeh wala code nhi likha tha pehle
    useEffect(() => {
        if (imageFile) {
            previewFile(imageFile)
        }
    }, [imageFile])

    return (

        <div>
            {
                loading ? (
                    <div className='w-full min-h-[60vh] flex items-center justify-center'>
                        <Spinner />
                    </div>
                ) : (
                    <div className='bg-richblack-800 rounded-lg px-2  xxs:px-4  sm:px-4 md:px-10 py-6 flex flex-col gap-8'>

                        <div className="flex items-center gap-x-4 xs:gap-x-8 md:gap-x-6 xmd:gap-x-4 ">
                            <img src={previewSource || user?.image}
                                alt={`profile - ${user?.firstName}`}
                                className='aspect-square w-[78px] rounded-full object-cover'
                            />

                            <div className='flex flex-col gap-3'>
                                <h2 className='text-richblack-5 md:text-lg text-[16px] font-semibold'>Change Profile Picture</h2>
                                <div className='flex gap-x-3'>

                                    <input
                                        type="file"
                                        ref={fileRef}
                                        onChange={fileChangeHandler}
                                        accept='image/png, image/gif, image/jpeg'
                                        className='hidden'
                                    />

                                    <button
                                        disabled={loading}
                                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-3 xs:px-5 font-semibold text-richblack-50"
                                        onClick={ClickHandler}
                                    >
                                        Select
                                    </button>

                                    <IconButton
                                        onclick={fileUploadHandler}
                                    >
                                        <div className='flex gap-2 items-center font-semibold '>
                                            <span>
                                                {
                                                    loading ? "Uploading..." : "Upload"
                                                }
                                            </span>
                                            <span>
                                                {
                                                    !loading && (
                                                        <FiUpload className='text-[16px] xs:text-lg'></FiUpload>
                                                    )
                                                }

                                            </span>

                                        </div>


                                    </IconButton>



                                </div>
                            </div>

                        </div>



                    </div>
                )

            }
        </div>
    )

}

export default ChangeProfile