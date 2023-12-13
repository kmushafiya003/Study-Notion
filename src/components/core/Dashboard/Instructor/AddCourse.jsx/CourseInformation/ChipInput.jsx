import React, { useState } from 'react'
import { useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux';

const ChipInput = (
  { label,
    name,
    placeholder,
    register,
    errors,
    inputClassName,
    setValue,
    getValues }
    
) => {

  const { editCourse, course } = useSelector((state) => state.course);
  const [chips, setChips] = useState([]);

  
  useEffect(() => {
    if (editCourse) {
      // console.log("Course is : ", course);
      setChips(course?.tag);
    }

    register(name,
      {
        required: true,
        validate: (value) => value.length > 0
      }
    )

  }, []);
  

  useEffect(() => {
    setValue(name, chips)
  }, [chips]);


 


  const handleKeyEvent = (events) => {

    // Check if user presses "Enter" or ","

    if (events.key === "Enter" || events.key === ",") {

      events.preventDefault();

      const chipValue = events.target.value.trim();


      if (chipValue && !chips.includes(chipValue)) {

        //add the chipValue to new array and clear the input

        const newChips = [...chips, chipValue];

        setChips(newChips);
        events.target.value = ""


      }

    }

  }

  const handleDeleteTag = (chipIndex) => {

    const newChips = chips.filter((_, index) => index !== chipIndex);
    setChips(newChips);

  }




  return (
    <div className='flex flex-col gap-4'>
      <label className='label-style'>
        <p className='tracking-wide'>{label} <span className='text-pink-200'>*</span></p>

        <input
          type="text"
          name={name}
          placeholder={placeholder}
          className={`${inputClassName}`}
          onKeyDown={handleKeyEvent}
        />
      </label>

      {/* tags list */}

      {
        chips.length > 0 && (
          <div>
            <ul className='flex gap-4'>
              {
                chips.map((chip, index) => (
                  <div key={index} className='flex gap-2 items-center bg-yellow-200 text-white p-1 rounded-lg'>
                    <li className='  tracking-wider'>
                      {chip}

                    </li>
                    <div onClick={() => handleDeleteTag(index)} className='text-lg cursor-pointer'>
                      <AiOutlineCloseCircle />
                    </div>
                  </div>
                ))
              }

            </ul>
          </div>


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

export default ChipInput