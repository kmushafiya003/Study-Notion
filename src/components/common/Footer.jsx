import React from 'react'
import logo from '../../assets/Logo/Logo-Small-Light.png'
import { Link } from 'react-router-dom'
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { FooterLink } from '../../data/footer-links'
import {BsFillSuitHeartFill} from 'react-icons/bs'
import {PiCopyrightBold} from 'react-icons/pi'

const Footer = () => {

    const Company = ["About", "Careers", "Affiliates"]

    const Support = ["Help Center"]

    const Resources = ["Articles", "Blog", "Chart Sheet", "Code Challenges", "Docs", "Projects", "Videos", "Workspaces"]

    const Plans = ["Paid memberships", "For Students", "Business Solutions"]

    const Community = ["Forums", "Chapters", "Events"]

    const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"]


    return (
        <div className=" bg-richblack-800 relative mx-auto lg:w-11/12 w-[95%] text-richblack-50 flex flex-col gap-6 pt-16  md:px-1 px-3">
            {/* ----------------- upper section ------------------- */}
            <div className='flex md:flex-row flex-col gap-16 md:gap-0  w-full md:justify-between  sm:px-3 '>

                {/* --------------left side--------------- */}
                <div className=' md:w-[50%] flex flex-row justify-between   flex-wrap xs:flex-nowrap gap-8 xs:gap-3 px-8 md:px-4 xs:ps-0'>

                    {/* ------------ 1st section------- */}
                    <div className='flex flex-col gap-4 '>
                        {/* ---------Logo -------- */}
                        <img src={logo} alt="logo" className='w-[40px]' />

                        {/* ------------ heading --------------- */}

                        <h1 className='font-bold text-[16px]'>Company</h1>

                        {/* ---------------- subtext ------------------ */}

                        <div className='flex flex-col gap-2 text-sm'>
                            {
                                Company.map((element, index) => {
                                    return (
                                        <div key={index} className='text-richblack-400 hover:text-richblack-50 transition-all duration-300 '>
                                            <Link to={element.toLowerCase()}>{element}</Link>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {/* ------------------ icons ------------------- */}

                        <div className='flex gap-3 text-xl text-richblack-400 '>
                            <Link className='text-richblack-400  hover:text-richblack-50 transition-all duration-300 '>
                                <FaFacebook />
                            </Link>
                            <Link className='text-richblack-400  hover:text-richblack-50 transition-all duration-300 '>
                                <FaGoogle />
                            </Link>
                            <Link className='text-richblack-400  hover:text-richblack-50 transition-all duration-300 '>
                                <FaTwitter />
                            </Link>
                            <Link className='text-richblack-400  hover:text-richblack-50 transition-all duration-300 '>
                                <FaYoutube />
                            </Link>

                        </div>


                    </div>

                    {/* ------------ 2nd section------- */}

                    <div className='flex flex-col gap-5'>

                        {/* ---------------- Resources --------------- */}
                        <div>
                            <h1 className='font-bold text-[16px] mb-3'>Resources</h1>
                            <div className='flex flex-col gap-2 text-sm'>
                                {
                                    Resources.map((element, index) => {
                                        return (
                                            <div key={index} className='text-richblack-400 hover:text-richblack-50 transition-all duration-300'>
                                                <Link to={element.toLowerCase()}>{element}</Link>
                                            </div>
                                        )
                                    })

                                }
                            </div>

                        </div>
                        {/* ---------------- Support --------------- */}
                        <div>
                            <h1 className='font-bold text-[16px] mb-3'>Support</h1>
                            <div className='flex flex-col gap-2 text-sm'>
                                {
                                    Support.map((element, index) => {
                                        return (
                                            <div key={index} className='text-richblack-400 hover:text-richblack-50 transition-all duration-300 '>
                                                <Link to={element.toLowerCase()}>{element}</Link>
                                            </div>
                                        )
                                    })

                                }
                            </div>


                        </div>
                    </div>


                    {/* ------------ 3rd section------- */}
                    <div className='flex flex-col gap-5'>

                        {/* ---------------- Plans --------------- */}
                        <div>
                            <h1 className='font-bold text-[16px] mb-3'>Plans</h1>
                            <div className='flex flex-col gap-2 text-sm'>
                                {
                                    Plans.map((element, index) => {
                                        return (
                                            <div key={index} className='text-richblack-400 hover:text-richblack-50 transition-all duration-300'>
                                                <Link to={element.toLowerCase()}>{element}</Link>
                                            </div>
                                        )
                                    })

                                }
                            </div>

                        </div>
                        {/* ---------------- Community --------------- */}
                        <div>
                            <h1 className='font-bold text-[16px] mb-3'>Community</h1>
                            <div className='flex flex-col gap-2 text-sm'>
                                {
                                    Community.map((element, index) => {
                                        return (
                                            <div key={index} className='text-richblack-400 hover:text-richblack-50 transition-all duration-300 '>
                                                <Link to={element.toLowerCase()}>{element}</Link>
                                            </div>
                                        )
                                    })

                                }
                            </div>


                        </div>
                    </div>



                </div>

                <div className='md:block hidden w-[1px] md:ml-5 smd:ml-0  bg-richblack-700 '></div>

                {/* -------------right side --------------- */}
                <div className=' md:w-[45%] flex flex-row justify-between px-8 xs:ps-0 flex-wrap xs:flex-nowrap gap-8 xs:gap-3'>

                    {/* -------------------- Sections ------------------- */}
                    {
                        FooterLink.map((elem, index) => {
                            return (
                                <div className='flex flex-col gap-5 ' key={index}>
                                    <h1 className='font-bold text-[16px] '>{elem.title}</h1>
                                    <div className='flex flex-col gap-2 text-sm'>
                                        {
                                            elem.links.map((link, index) => {
                                                return (
                                                    <div key={index} className='text-richblack-400 hover:text-richblack-50 transition-all duration-300'>
                                                        <Link to={link.link}>{link.title}</Link>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>

            {/* ---------------------- rule ----------------------------- */}
            <hr className='border-t-[1px] border-richblack-700 ' />

            {/* ---------------------lower section ------------------------ */}
            <div className=' flex sm:flex-row flex-col w-full sm:justify-between items-center gap-6 sm:gap-0 px-2 mb-8 '>

                {/* -------------------- left part -------------- */}
                <div className='sm:w-[30%] flex flex-row gap-5 xs:text-sm text-[12px] font-semibold text-richblack-400 '>
                    {
                        BottomFooter.map((elem, index) => {
                            return (
                                <div key={index} className='pr-4 border-r-[1px] border-richblack-700'>
                                    {elem}
                                </div>
                            )
                        })
                    }
                </div>
                {/* ------------------- right part -------------------- */}

                <div className=' flex flex-row items-center gap-1 xs:text-sm text-[12px] font-semibold text-richblack-200 ' >Made with <span className='text-pink-400'><BsFillSuitHeartFill/></span>  by Mushhh <span><PiCopyrightBold/></span>2023 StudyNotion </div>
            </div>
        </div>
    )
}

export default Footer