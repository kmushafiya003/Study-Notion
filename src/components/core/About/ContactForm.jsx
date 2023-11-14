import React from 'react'
import ContactTemplate from '../../ContactPage/ContactTemplate'

const ContactForm = () => {
  return (
    <div className='flex flex-col gap-8 xlg:w-[60%]  lg:w-[70%] xs:w-[80%] w-[90%] mx-auto'>

      {/* --------------- upper part  --------------- */}

      <div className='flex flex-col gap-3  items-center'>
        <h1 className='lg:text-4xl text-3xl font-semibold text-richblack-5'>Get in Touch</h1>
        <p className='text-[16px] text-richblack-300 text-center'>We’d love to here for you, Please fill out this form.</p>
      </div>



      {/* ------------------- Form Part --------------------- */}
      
      <div>
        <ContactTemplate></ContactTemplate>
      </div>

    </div>
  )
}

export default ContactForm