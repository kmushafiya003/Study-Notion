import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
// import { TbMenu2 } from 'react-icons/tb'
// import { GoSidebarCollapse} from 'react-icons/go'
import {BsThreeDotsVertical} from 'react-icons/bs'
import { useState } from 'react';
import ResponsiveSidebar from '../components/core/Dashboard/ResponsiveSidebar';
import { useRef } from 'react';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { useLocation } from 'react-router-dom'


const Dashboard = () => {

    const [open , setOpen] = useState(false);
    const location = useLocation()

    useEffect(()=> {
        setOpen(false);
    
      }, [location.pathname])

    const myRef = useRef();

    useOnClickOutside(myRef , ()=> setOpen(false))

    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    

    if (profileLoading || authLoading) {

        return (
            <div className=' min-h-[calc(99vh-3.5rem)] flex items-center justify-center'>
                <Spinner />
            </div>

        )
    }

    return (
        <div className={`relative flex min-h-[calc(99vh-3.5rem)] mt-14
        ${open ? "" : ""
    }
        `}>

            <Sidebar></Sidebar>


            <div className='h-[calc(99vh-3.5rem)] sm:w-11/12 w-full  overflow-auto border'>

                <div className=' sm:py-12 py-6  mx-auto border-2 border-blue-200'>
                    <div className='flex sm:hidden items-center w-max mt-2 mb-8  text-white text-2xl cursor-pointer hover:text-yellow-100' onClick={() => setOpen(true)}>
     
                        <BsThreeDotsVertical></BsThreeDotsVertical>
                      
                    </div>
                    <Outlet></Outlet>
                </div>

            </div>
            

            {
                open && (
                    <ResponsiveSidebar  open={open} setOpen={setOpen} />
                )
            }
            
           


        </div>
    )
}

export default Dashboard