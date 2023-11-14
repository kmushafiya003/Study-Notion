import React from 'react'
import * as Icons from 'react-icons/vsc';
import { NavLink, matchPath, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const SidebarLink = ({link , iconName }) => {

    const Icon = Icons[iconName];

    const location = useLocation();
    const dispatch = useDispatch();


    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }



    return (
        <NavLink  to={link.path} >
            <div className={` text-sm font-medium px-8 py-2 relative text-richblack-300 hover:text-yellow-50 transition-all duration-500 
        ${matchRoute(link.path) ? "bg-yellow-800 bg-opacity-60 text-yellow-50 border-l border-yellow-5" : "bg-opacity-0"}
        `}>

            
            {/* <span className={`absolute top-0 left-0 h-full w-[0.2rem] bg-yellow-50 
            ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}
            `}>

            </span> */}
        <div className='flex flex-row items-center gap-x-2'>
            <Icon className="text-lg"/>
            <span>{link.name}</span>
            
        </div>
        </div>

        </NavLink>
    )
}

export default SidebarLink