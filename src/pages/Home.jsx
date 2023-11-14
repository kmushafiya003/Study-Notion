import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import HighlightText from '../components/common/HighlightText'
import CTAButton from '../components/common/Button'
import Banner from './../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/Home/CodeBlocks'
import Footer from '../components/common/Footer'
import Timeline from '../components/core/Home/Timeline'
import LearningLanguage from '../components/core/Home/LearningLanguage'
import InstructorSection from '../components/core/Home/InstructorSection'
import Reviews from '../components/core/Home/Reviews'
import ExploreMore from '../components/core/Home/ExploreMore'


const Home = () => {
    return (
        <div >
            {/* -----------------------Section 1--------------------- */}
            <div className='relative mx-auto flex flex-col lg:w-11/12 w-[95%] max-w-maxContent  text-white justify-between mt-36  '>

                <div className='w-[80%] mx-auto  '>
                    {/* -------------------------- Instructor Button -------------------------- */}
                    


                        <div className=' p-1 md:mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-300 hover:scale-95 w-max shadow shadow-richblack-500 '>
                            <Link to={"/signup"}  >
                                <div className='flex flex-row items-center gap-3 rounded-full px-6 py-[5px] transition-all duration-300 group-hover:bg-richblack-900  '>
                                    <p>Become an Instructor</p>
                                    <FaArrowRight className='text-[12px]'></FaArrowRight>
                                </div>
                            </Link>

                        </div>

                   

                    {/* ------------------------------  header  --------------------------------- */}

                    <div className='md:text-center text-left lg:text-4xl text-3xl font-semibold mt-8'>
                        Empower Your Future with <HighlightText text={"Coding Skills"}></HighlightText>
                    </div>

                    {/* --------------------------------  Sub Heading  ---------------------------------- */}
                    <div className=' md:text-center text-left lg:text-lg text-[16px] font-bold text-richblack-300 leading-6 mt-6'>
                        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                    </div>

                    {/* ---------------------------------- Buttons  ----------------------- */}

                    <div className='flex flex-row gap-7 mt-8 sm:justify-center justify-start'>
                        <CTAButton active={true} linkto={"/signup"}>
                            Learn More
                        </CTAButton>

                        <CTAButton active={false} linkto={"/login"}>
                            Book Demo
                        </CTAButton>

                    </div>
                </div>

                {/* -----------------------  Video Banner ----------------------- */}
                <div className=' w-full flex justify-center'>
                    <div className='white-shadow banner-video
                 w-10/12 md:mx-3 my-12 relative z-10 '>
                        <video
                            muted
                            loop
                            autoPlay
                            className=' '
                        >
                            <source src={Banner} type='video/mp4' />
                        </video>

                    </div>
                </div>

                {/* ---------------------------- Code Sections --------------------------- */}
                <div >

                    {/* --------------------------Code Section 1 ----------------------- */}
                    <div>
                        <CodeBlocks
                            position={"md:flex-row flex-col"}
                            heading={
                                <div className='lg:text-4xl text-3xl text-center lg:text-left font-semibold'>
                                    Unlock your <HighlightText text={"coding potential"}></HighlightText> with our online courses.
                                </div>
                            }
                            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                            ctabtn1={
                                {
                                    text: "Try it Yourself",
                                    active: true,
                                    linkto: "/signup"

                                }
                            }
                            ctabtn2={
                                {
                                    text: "Learn More",
                                    active: false,
                                    linkto: "/login"

                                }
                            }
                            codeblock={'<!DOCTYPE html>\n <html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>'}

                            codeColor={"bg-clip-text text-transparent bg-gradient-to-r from-pink-100 to-yellow-300"}

                            backgroundGradient={"pink-gradient"}

                        />
                    </div>

                    {/* --------------------------Code Section 2 ----------------------- */}
                    <div>
                        <CodeBlocks
                            position={"md:flex-row-reverse flex-col"}
                            heading={
                                <div className='lg:text-4xl text-3xl text-center lg:text-left font-semibold'>
                                    Start <HighlightText text={"coding"} /> <HighlightText text={" in seconds"} />
                                </div>
                            }
                            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                            ctabtn1={
                                {
                                    text: "Continue Lesson",
                                    active: true,
                                    linkto: "/signup"

                                }
                            }
                            ctabtn2={
                                {
                                    text: "Learn More",
                                    active: false,
                                    linkto: "/login"

                                }
                            }
                            // codeblock={'<!DOCTYPE html>\n <html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>'}

                            codeblock={'#include <stdio.h>\nint main() \n{ \nint rows \nprintf("Number of rows: ");\nscanf("%d", &rows);\n //Two loops Used \n for (int i = 1; i <= rows; i++) { \n for (int j = 1; j <= i; j++) {  \n return 0; } '}

                            codeColor={"bg-clip-text text-transparent bg-gradient-to-r from-yellow-5 to-pink-500"}
                            backgroundGradient={"yellow-gradient"}

                        />
                    </div>
                </div>


                {/* ------------------------ Explore More Section------------------------------ */}

                <ExploreMore></ExploreMore>

            </div>


            {/* -----------------------Section 2--------------------- */}

            <div className='bg-pure-greys-5 text-richblack-700  pb-16  pt-20 sm:pt-0'>

                {/* ------------------------ frame Image Section --------------------- */}

                <div className='homepage_bg h-[300px] flex items-center justify-center'>

                    <div className='lg:w-11/12 sm:w-[95%] w-full   mx-auto max-w-maxContent relative flex items-center justify-center gap-5 mt-16'>
                        <div className='flex flex-row  gap-7 text-white '>

                            <CTAButton active={true} linkto={"/signup"}>
                                <div className="flex flex-row items-center gap-3">
                                    Explore Full Catalogue
                                    <FaArrowRight></FaArrowRight>

                                </div>


                            </CTAButton>
                            <CTAButton active={false} linkto={"/signup"}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>
                </div>

                {/* -------------------------- container - 1 ------------------------ */}

                <div className='lg:w-11/12 w-[95%] mx-auto max-w-maxContent relative flex flex-col gap-16 items-center '>

                    {/* ------------------------  upper sub-container ------------------- */}

                    <div className=' w-full flex sm:flex-row flex-col  sm:gap-2 gap-10 sm:px-4 px-1 md:px-0  md:gap-4 md:justify-center sm:justify-between '>

                        {/* -------------------  left side ------------------ */}
                        <div className='lg:text-4xl text-3xl font-semibold md:w-[45%] sm:w-[50%] w-[90%] mx-auto sm:mx-0  sm:px-3 md:px-0 px-1 text-center sm:text-left'>
                            Get the skills you need for a <HighlightText text={"job that is in demand."}
                            />
                        </div>

                        {/* ----------------------  right side ------------------- */}

                        <div className='md:w-[45%] sm:w-[50%] w-[90%] mx-auto sm:mx-0 flex flex-col gap-8  sm:px-3 md:px-0 px-1 '>

                            <div className='text-[16px] leading-6 font-semibold text-richblack-700'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>

                            <div className='w-max'>
                                <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                            </div>

                        </div>
                    </div>

                    {/* ----------------------  lower sub-container (Timeline Section) ------------------------ */}

                    <Timeline></Timeline>


                </div>

                {/* ----------------------   container-2 -------------------------------------- */}
                <div className='lg:w-11/12 w-[95%] mx-auto max-w-maxContent relative  flex flex-col gap-16 items-center mt-14 '>
                    <LearningLanguage> </LearningLanguage>
                </div>


            </div>


            {/* -----------------------Section 3--------------------- */}


            <div className='lg:w-11/12 w-[95%] mx-auto max-w-maxContent relative flex flex-col  text-white justify-between gap-8 pt-20'>


                {/* ------------------------ Become an Instructor ---------------- */}
                <InstructorSection></InstructorSection>


                {/* -------------------  Reviews -------------------------------- */}
                <Reviews></Reviews>

            </div>




            {/* -----------------------Footer--------------------- */}
            <div className='bg-richblack-800'>
                <Footer></Footer>
            </div>

        </div >
    )
}

export default Home