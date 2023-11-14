import React from 'react'
import { useState } from 'react';
import { VscSignOut } from 'react-icons/vsc'
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineCaretDown } from 'react-icons/ai'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';




const ProfileDropDown = () => {

  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const myRef = useRef(null);

  useOnClickOutside(myRef, () => setOpen(false));
  
  

  if (!user) {
    console.log("User Nhi hai!!!");
    return null;
  }


  



  return (

    <button className=' relative' onClick={() => setOpen(true)}>
      <div className='flex items-center gap-1  '>
        <div className='flex items-center gap-x-1 '>

          <img src={user?.image} alt={`profile -${user?.firstName} `} className='aspect-square w-[30px] rounded-full object-cover' />
        </div>
        <AiOutlineCaretDown className='text-sm text-richblack-100'></AiOutlineCaretDown>
      </div>
      {
        open && (
          <div onClick={(event) => event.stopPropagation()} ref={myRef}
            className="absolute top-[118%] right-0 z-[10000] divide-y-[1px] divide-richblack-700  rounded-md border-[1px] border-richblack-700 bg-richblack-800">

            <Link to='/dashboard/my-profile' onClick={() => setOpen(false)} >
              
              <div className='flex gap-2 items-center px-3 py-2  hover:bg-richblack-700 hover:text-richblack-25 transition-all duration-200 border-b border-richblack-700 cursor:pointer'>
                <RxDashboard className='text-lg' />
                Dashboard
              </div>

            </Link>
  

            <div onClick={() => {
              console.log("ONclick hua hai");
              dispatch(logout(navigate));
              setOpen(false);
              

            }}
              className='flex gap-2 items-center px-3 py-2  hover:bg-richblack-700 hover:text-richblack-25 transition-all duration-200 border-b border-richblack-700 cursor:pointer'>
              <VscSignOut className='text-lg' />
              Logout
            </div>

          </div>
        )
      }

      

    </button>



  )
}

export default ProfileDropDown