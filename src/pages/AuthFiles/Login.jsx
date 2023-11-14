import React from 'react'
import Template from '../../components/core/Auth/Template'
import loginImg from '../../assets/Images/login.webp'

const Login = () => {
  return (
    <div className='w-full mt-16'>
        <Template
        title = {"Welcome Back"}
        desc1 = {"Build skills for today, tomorrow, and beyond."}
        desc2 = {"Education to future-proof your career."}
        formtype={"login"}
        image = {loginImg}
        >

        </Template>
    </div>
  )
}

export default Login