import React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from '../../data/countrycode.json'
import { apiConnector } from '../../services/apiConnector';
import { contactusEndpoint } from '../../services/apiLinks';
import { toast } from 'react-hot-toast'

const { CONTACT_US_API} = contactusEndpoint;

const ContactTemplate = () => {


  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm();

  const submitContactForm = async (data) => {

    console.log("Form ka data : ", data);

    setLoading(true)
    try {

      const response = await apiConnector("POST" , CONTACT_US_API , data );

      console.log("Response : " , response);

      toast.success("Message send")

      

    } catch (err) {
      console.log("Error in Contact Form");
      console.log(err);
      console.log(err.message)

    }
    setLoading(false)
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        countryCode: "+91",
        phoneNo: "",
      })
    }

  }, [reset, isSubmitSuccessful]);



  return (
    <div>
      <form className=' flex flex-col gap-6 form-style mmd:w-[85%] sm:w-[90%] mx-auto py-6 xs:px-6 px-4 ' onSubmit={handleSubmit(submitContactForm)}>

        {/* ------------- firstName and LastNAme ----------------------- */}

        <div className='flex md:flex-row flex-col xlg:gap-3 gap-2  md:justify-center'>

          {/* -------------- firstName----------- */}
          <div className='md:w-[45%] '>

            <label className='label-style'>
              <p className='tracking-wide'>First name </p>
              <input
                type="text"
                name="firstName"
                placeholder='Enter first name'
                {...register("firstName", { required: true })}
                className='bg-richblack-800 py-2 rounded-lg px-3 shadow-sm shadow-richblack-200'

              />
              {
                errors.firstName && (
                  <span className='text-sm text-red-100  rounded-md px-3'>
                    Please enter your name
                  </span>
                )
              }
            </label >
          </div>

          {/* ----------------- lastName --------------------- */}

          <div className='md:w-[45%] '>
            <label className='label-style'>
              <p className=' tracking-wide'>Last name</p>
              <input
                type="text"
                name="lastName"
                placeholder='Enter last name'
                className='bg-richblack-800 py-2 rounded-lg px-3 shadow-sm shadow-richblack-200'
                {...register("lastName")}

              />
            </label >

          </div>

        </div>

        {/* ---------------- Email Address ------------------------ */}

        <div className=' md:px-4'>
          <label className='label-style'>
            <p className=' tracking-wide'>Email Address</p>
            <input
              type="email"
              name="email"
              placeholder='Enter email address'
              {...register("email", { required: true })}
              className='bg-richblack-800 py-2 rounded-lg px-3 shadow-sm shadow-richblack-200'
            />
            {
              errors.email && (
                <span className='text-sm text-red-100  rounded-md px-3'>Please enter your email address</span>
              )
            }
          </label >

        </div>

        {/* -------------------- Phone Number ------------------------------- */}

        <div className='flex flex-col gap-2 md:px-4'>

          <label htmlFor="phone" className='label-style'>Phone Number</label>


          <div className='flex flex-row justify-between'>

            {/* -------- dropdown ------ */}
           
              <select name="dropdown" id="dropdown" {...register("countryCode", { required: true })}
                className='w-[80px] pl-3 bg-richblack-800  rounded-lg  shadow-sm shadow-richblack-200  '
              >
               
                {

                  CountryCode.map((element, index) => {
                    return (
                      <option key={index} value={element.code}>
                        {element.code} - {element.country}
                      </option>
                    )
                  })

                }

              </select>

           

            {/* ----------- phone Number -------- */}

           
              <input
                type="number"
                name="phoneNo"
                id='phone'
                placeholder='12345 67890'
                className='w-[calc(100%-110px)] bg-richblack-800 py-2 rounded-lg px-3 shadow-sm shadow-richblack-200 '
                {...register("phoneNo",
                  {
                    required: {value : true , message : "Please enter phone number"},
                    maxLength: { value: 10, message: "Invalid Phone Number" },
                    minLength: { value: 8, message: "Invalid Phone Number" },
                  }
                )}
              />
      

          </div>
          {
            errors.phoneNo && (
              <span className='text-sm text-red-100  rounded-md px-3'>{errors.phoneNo.message}</span>
            )
          }

        </div>



        {/* ---------------------- Message -------------------------- */}
        <div className='md:px-4'>
          <label className='label-style'>
            <p className=' tracking-wide'>Message</p>

            <textarea
              name="message"
              id="message"
              cols="30"
              rows="5"
              placeholder='Enter your message here'
              {...register("message", { required: true })}
              className='bg-richblack-800 py-2 rounded-lg px-3 shadow-sm shadow-richblack-200'
            >
            </textarea>
            {
              errors.message && (
                <span className='text-sm text-red-100  rounded-md px-3'>
                  Please enter your message
                </span>
              )
            }

          </label >

        </div>

        {/* --------------------- Submit Button ------------------------- */}
        <div className='w-full md:px-4'>
          <button type='submit' className='w-full bg-yellow-50 text-black hover:scale-95 transition-all duration-300 shadow shadow-richblack-600 text-center lg:text-[16px] text-[14px]  lg:px-6 sm:px-4 px-[6px] py-3 rounded-md font-bold'>
            Send Message
          </button>
        </div>



      </form>

    </div>
  )
}

export default ContactTemplate