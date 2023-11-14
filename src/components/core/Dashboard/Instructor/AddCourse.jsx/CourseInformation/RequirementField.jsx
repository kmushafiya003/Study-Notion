import React, { useEffect } from 'react'
import { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux'

const RequirementField = ({ name, label, placeholder, register, errors, setValue, getValues, className }) => {

    const {editCourse , course} = useSelector((state)=> state.course);
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    useEffect(() => {
        if(editCourse){
             setRequirementList(course?.instructions);
        }

        register(
            name,
            {
                required: true,
                validate: (value) => value.length > 0
            }

        )

    }, []);

    useEffect(()=> {
        setValue(name , requirementList);

    } , [requirementList])

   

    const handleAddRequirement = (events) => {

        events.preventDefault();
    
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }

    }

    const handleRemoveRequirement = (index) => {

        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);

        setRequirementList(updatedRequirementList);

    }





    return (
        <div className='flex flex-col gap-4  '>
            <label className='label-style'>
                <p className='tracking-wide'>{label} <span className='text-pink-200'>*</span></p>

                <input
                    type="text"
                    value={requirement}
                    name={name}
                    placeholder={[placeholder]}

                    onChange={(events) => {
                        return setRequirement(events.target.value)
                    }}
                    className={`${className} `}

                />



            </label>

            <button onClick={handleAddRequirement} className='w-max flex text-yellow-50 font-semibold border border-richblack-600 px-3 py-1 rounded-md bg-richblack-700'>
                Add
            </button>

            {
                requirementList.length > 0 && (

                    <ul className=' flex flex-col gap-1'>
                        {
                            requirementList.map((requirement, index) => (
                                <div key={index} className='flex gap-4 ' >
                                    <li className=' text-richblack-100 tracking-wider'>
                                        {requirement}
                                    </li>
                                    <button className='text-lg cursor-pointer' onClick={() => handleRemoveRequirement(index)}>
                                        <AiOutlineCloseCircle />
                                    </button>
                                </div>

                            ))
                        }


                    </ul>
                )
            }

            {
                errors[name] && (
                    <span className='text-sm text-red-100  rounded-md px-3'>
                        {label} is required
                    </span>
                )
            }


        </div>
    )
}

export default RequirementField