import React, { useEffect } from 'react'
import { FiUploadCloud } from "react-icons/fi"

import { useDropzone } from 'react-dropzone'

import "video-react/dist/video-react.css"
import { Player } from 'video-react'
import { useState } from 'react'

const Upload = ({
    name,
    label,
    register,
    errors,
    setValue,
    video = false,
    viewData = null,
    editData = null,
}) => {

  

    const [selecetdFile, setSelecetdFile] = useState(null);
    const [preivewSource, setPreviewSource] = useState(
        viewData ? viewData : editData ? editData : ""
    )




    useEffect(()=> {

        register(name , { required : true});

    }, [register]);



    useEffect(()=> {

        setValue(name , selecetdFile)

    }, [selecetdFile , setValue]);


  

    const onDrop = (acceptedFile) => {

        const file = acceptedFile[0];

        if(file){
            previewFile(file);
            setSelecetdFile(file);
        }

    }

    
    const previewFile = (file) => {
    
        const reader = new FileReader();
        reader.readAsDataURL(file);

       reader.onloadend = () => {
        setPreviewSource(reader.result);
       }

      
    }



    const { getRootProps, getInputProps, isDragActive } = useDropzone({

        accept: !video ?
            { "image/*": [".jpeg", ".jpg", ".png"] } :
            { "video/*": [".mp4"] },
        onDrop,

    })


    return (
        <div>
            <label htmlFor={name} className='label-style mb-2'>
                <p className='tracking-wide'>{label}  {!viewData && (<span className='text-pink-200'>*</span> )} </p> 

                <div className={` ${isDragActive ? "bg-richblack-600" : "bg-richblack-700"}
                py-3 text-[16px] rounded-lg px-3 w-full   border-2 border-dotted border-richblack-500 cursor-pointer
                `}>
                    {
                        preivewSource ? (
                            //Agr previewSource mei file hai 
                            <div className='flex flex-col items-center gap-y-4 '>
                                {
                                    !video ? (
                                        // If , it is an image
                                        <img src={preivewSource}
                                            alt="thumbnail"
                                            className='w-full h-full rounded-md object-cover' />

                                    ) : (
                                        // If , it is video

                                        <Player
                                            aspectRatio="16:9"
                                            playsInline
                                            src={preivewSource}

                                        />


                                    )

                                }
                                {
                                    !viewData && (
                                        <button
                                        onClick={()=> {
                                            setPreviewSource("");
                                            setSelecetdFile(null);
                                            setValue(name , null);
                                        }}
                                         className='px-2 sm:px-3 py-2  text-sm xs:text-[16px] rounded-lg text-richblack-400 bg-richblack-900'>
                                            Cancel
                                        </button>
                                    )
                                }
                            </div>

                        ) :
                            (
                                //Agr previewSource mei file nhi hai 
                                <div {...getRootProps()} className='flex flex-col gap-y-3 items-center  text-[12px] py-5 text-richblack-400 tracking-wide'>
                                    <input {...getInputProps()}  />

                                     <div className='flex flex-col items-center text-richblack-200'>
                                    <div className='grid aspect-square w-14 rounded-full place-items-center bg-richblack-900  '>

                                        <FiUploadCloud className='text-2xl text-yellow-50'/>
                                    </div>

                                    <p>Drag and drop {!video ? "image" : "video"}, or   </p>
                                    <p>  click to <span className='text-yellow-50'>Browse</span> a file</p>
                                      
                                   

                                    </div>

                                   
                                        <ul className='px-2 flex gap-x-6 xs:gap-x-8 sm:gap-x-12 text-richblack-400 list-disc mt-5'>
                                            <li>Aspect ratio 16:9</li>
                                            <li>Recommended size 1024 x 576</li>
                                        </ul>
                                    



                                </div>

                            )
                    }

                </div>
                {
                    errors[name] && (
                        <span className='text-sm text-red-100  rounded-md px-3'>
                        {label} is Required
                    </span>
                    )
                }
                </label>


        </div>
    )
}

export default Upload