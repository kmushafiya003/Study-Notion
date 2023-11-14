import React from 'react'
import Template from '../../components/core/Auth/Template'
import singupImg from '../../assets/Images/signup.webp'

const Signup = () => {
  return (
    <div className='w-full mt-16'>
        <Template
        title = {"Join the millions learning to code with StudyNotion for free"}
        desc1 = {"Build skills for today, tomorrow, and beyond."}
        desc2 = {"Education to future-proof your career."}
        formtype={"signup"}
        image = {singupImg}
        >

        </Template>
    </div>
  )
}

export default Signup