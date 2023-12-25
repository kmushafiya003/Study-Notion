import React from 'react'
import { NavbarLinks } from '../../data/navbar-links'
import { Link } from 'react-router-dom'
import { RiCloseLine } from 'react-icons/ri'
import { AiFillCaretRight } from 'react-icons/ai'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { useRef } from 'react'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

const ResponsiveNavbar = ({ menu, setMenu, matchRoute, subLinks }) => {

    const { token } = useSelector((state) => state.auth);

    const myRef = useRef(null)
   


    const [openCatalogue, setOpenCatalogue] = useState(false)

    const clickHandler = () => {
        setOpenCatalogue(false);
        setMenu(true);
    }



    // useOnClickOutside(myRef, () =>{
    //     setMenu(false)
    //     setOpenCatalogue(false);
    // } );




    return (

        <>
            <div className={`visible sm:invisible  fixed inset-0  z-[9999] overflow-auto bg-white bg-opacity-10  backdrop-blur-sm  text-richblack-5 transiton-all duration-300
    
        `}>


                <div className={`  bg-richblack-800  border border-richblack-600 absolute xs:w-[350px] w-[250px]  top-2   rounded-lg xs:text-lg text-[16px] h-[550px] z  shadow shadow-richblack-600 animation-right right-[1px] bg-opacity-90  transition-all duration-500`} ref={myRef} onClick={(event) => event.stopPropagation()}>

                    {/* ---------------- close button ------------------ */}

                    <div className='w-full  flex justify-end mt-5 cursor-pointer text-2xl hover:text-yellow-25' onClick={() => setMenu(false)}>
                        <RiCloseLine className='mr-5'></RiCloseLine>
                    </div>

                    {/* ------------- navlinks ---------------------------- */}

                    <nav className='w-full  pt-10 pb-4 '>
                        <ul className='flex flex-col gap-10 w-full h-full  items-center '>
                            {

                                NavbarLinks.map((navlink, index) => {
                                    return (
                                        <li key={index} >

                                            {

                                                navlink.title === "Catalog" ?
                                                    (
                                                        <div className='group flex  items-center gap-3 ml-5' onClick={() => setOpenCatalogue(true)}>
                                                            <p className={` cursor-pointer text-richblack-25 group-hover:text-richblack-5  transition-all duration-200
                                                        `}>
                                                                {navlink.title}
                                                            </p>
                                                            <AiFillCaretRight className='invisible text-yellow-25 group-hover:visible  ' />

                                                        </div>
                                                    ) :
                                                    (
                                                        <Link to={navlink.path}>
                                                            <p className={`
                                                          ${matchRoute(navlink?.path) ? "text-yellow-25 font-semibold " : "text-richblack-25 hover:text-richblack-5 transition-all duration-200 border-animation"}
                                                          `}>
                                                                {navlink.title}
                                                            </p>
                                                        </Link>
                                                    )

                                            }


                                        </li>
                                    )
                                })

                            }
                            {
                                token === null && (
                                    <Link to="/login">
                                        <button className=' py-2 px-3  border  border-richblack-700 rounded-lg bg-richblack-800 text-richblack-100 hover:bg-richblack-900 hover:border-richblack-500 transition-all duration-200'>
                                            Log in
                                        </button>
                                    </Link>
                                )
                            }
                            {
                                token === null && (
                                    <Link to={"/signup"}>
                                        <button className='py-2 px-3   border border-richblack-700 rounded-lg bg-richblack-800 text-richblack-100 hover:bg-richblack-900 hover:border-richblack-500 transition-all duration-200'>
                                            Sign up
                                        </button>
                                    </Link>
                                )
                            }
                        </ul>
                    </nav>
                </div>


                {/* ---------------------------------  catalogue slide ------------------ */}

                <div className={` visible sm:invisible bg-richblack-900 text-richblack-25  shadow shadow-richblack-600  border border-richblack-600 absolute xs:w-[350px] w-[250px]  top-2  rounded-lg text-xl min-h-[550px]   z-50 
              ${openCatalogue ? "right-2" : "right-[-500%]"}
              transition-all duration-500 flex flex-col
            ` } >
                    <div className='w-full  flex justify-start mt-5 ml-5 cursor-pointer text-2xl hover:text-yellow-25' onClick={clickHandler}>
                        <RiCloseLine className='mr-5'></RiCloseLine>
                    </div>
                    <div className='flex flex-col pl-16 items-start gap-y-4  w-full h-full xs:text-lg text-[16px]'>
                        {
                            subLinks.length ? (

                                subLinks.map((subLink, index) => {

                                    return (
                                      <Link to={`/catalog/${subLink.name
                                        .split(" ")
                                        .join("-")
                                        .toLowerCase()}`}
                                         key={index} className='rounded-lg bg-transparent py-3 pl-4 pr-2 hover:bg-blue-300'>
                                        {subLink.name}
                                      </Link>
                                    )
                                  })

                            ) :
                                (<div></div>)
                        }
                    </div>

                </div>
            </div>

        </>



    )
}

export default ResponsiveNavbar