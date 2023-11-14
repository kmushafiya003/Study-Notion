import React from 'react'
import { BsFillChatFill } from 'react-icons/bs';
import { BiWorld } from 'react-icons/bi'
import { BiSolidPhoneCall } from 'react-icons/bi'
import ContactTemplate from '../components/ContactPage/ContactTemplate';
import Reviews from '../components/core/Home/Reviews';
import Footer from '../components/common/Footer';


const connect = [
    {
        icon: <BsFillChatFill />,
        heading: "Chat on us",
        para1: "Our friendly team is here to help",
        para2: "abc123@gmail.com"
    },
    {
        icon: <BiWorld />,
        heading: "Visit us",
        para1: "Come and say hello at our office HQ",
        para2: "Here is the localion/address"
    },
    {
        icon: <BiSolidPhoneCall />,
        heading: "Call us",
        para1: "Mon - Fri From 8am to 5pm",
        para2: "+123 456 7890"
    },
]

const ContactUs = () => {
    return (

        <section>
            <div className='relative mt-14 mx-auto f lg:w-11/12 w-[95%] max-w-maxContent  text-richblack-100  md:pt-20 sm:pt-16 py-12  flex flex-col gap-4'>


                {/* ---------------------------- contact section  ------------------------ */}

                <div className=' flex md:flex-row flex-col sm:justify-center items-center md:items-start gap-10 mt-2 '>

                    {/* -----------------connect with us --------------------- */}

                    <div className='lg:w-[35%] md:w-[40%]  xs:w-[80%] w-[90%]  bg-richblack-800 h-max rounded-lg py-10 px-8 flex flex-col gap-6'>
                        {
                            connect.map((element, index) => {
                                return (
                                    <div key={index} className=' flex flex-row gap-2 py-2 px-2'>

                                        {/* --------------- icons --------------- */}

                                        <div className='mt-1 text-xl'>{element.icon}</div>

                                        {/* ----------------- info ------------------- */}

                                        <div className='flex flex-col'>
                                            <h2 className='text-richblack-5 font-semibold text-lg'>{element.heading}</h2>
                                            <p className='text-[14px] text-richblack-200'>{element.para1}</p>
                                            <p className='text-[14px] text-richblack-200'>{element.para2}</p>

                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>



                    {/* -----------------  contact form ---------------------------- */}

                    <div className='lg:w-[50%] xmd:w-[55%] md:w-[60%] w-[90%] pt-[52px] pb-4 border border-richblack-600 rounded-lg'>

                        <h1 className='lg:text-4xl text-3xl font-semibold text-richblack-5 sm:pl-[60px] pl-[20px] pr-2 mb-4'>Got a Idea? We’ve got the skills. Let’s team up</h1>
                        <p className='sm:pl-[60px] pl-[20px] text-[16px] text-richblack-300 mb-2 pr-2'>Tell us more about yourself and what you’re got in mind.</p>
                        <div className=''>
                            <ContactTemplate />
                        </div>




                    </div>




                </div>

                {/* ------------------------------ Review section ----------------------------- */}

                <Reviews />

            </div>

            {/* ----------------------------- Footer ------------------------------------ */}

            <div className='mt-16 bg-richblack-800'>
                <Footer />

            </div>
        </section>

    )
}

export default ContactUs