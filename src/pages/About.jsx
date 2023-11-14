import React from 'react'
import HighlightText from '../components/common/HighlightText'
import Quote from '../components/core/About/Quote'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import FoundingStory from '../assets/Images/FoundingStory.png'
import StatsComponent from '../components/core/About/StatsComponent'
import Footer from '../components/common/Footer'
import LearningGrid from '../components/core/About/LearningGrid'
import ContactForm from '../components/core/About/ContactForm'
import Reviews from '../components/core/Home/Reviews'

const About = () => {
    return (
        <div>

            {/* -------------------------  Section 1 (headings and images) -------------------------------------- */}


            <section className='bg-richblack-800 sm:h-[618px] mt-14  xs:h-[1020px] h-[1080px] '>

                <div className='relative mx-auto flex flex-col lg:w-11/12 w-[95%] max-w-maxContent  text-richblack-100 items-center md:pt-20 sm:pt-16 pt-12  gap-10'>

                    {/* ---------------------- About Us ------------------------------  */}

                    <h2 className='text-[16px] text-richblack-200'>About us</h2>



                    {/* -----------------------------   heading and subHeading  ------------------------------- */}

                    <div className='w-[72%] mx-auto '>
                        <header className='md:text-center text-left lg:mt-8 mt-4  lg:text-4xl text-3xl font-semibold text-richblack-5'>
                            Driving Innovation in Online Education for a
                            <HighlightText text=" Brighter Future"></HighlightText>
                        </header>
                        <h2 className=' md:text-center text-left lg:text-lg text-[16px] font-bold text-richblack-300 leading-6 mt-6 xxs:mb-10 mb-5'>
                            Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                        </h2>
                    </div>

                    {/* -------------------------------  Images --------------------------------- */}
                    <div className=' absolute xlg:top-[100%] top-[110%]  w-[95%] flex gap-4  py-3 px-3 lg:px-0 justify-center flex-wrap sm:flex-nowrap overflow-hidden z-10'>


                        <img src={BannerImage1} alt="AboutImage1" className='md:w-[80%] sm:w-[85%] object-cover' />
                        <img src={BannerImage2} alt="AboutImage2" className='md:w-[80%] sm:w-[85%] object-cover ' />
                        <img src={BannerImage3} alt="AboutImage3" className='md:w-[80%] md:object-cover xmd:inline hidden' />

                    </div>

                </div>


            </section>


            {/* -------------------------  Section 2 (Quote) -------------------------------------- */}


            <section>


                <div className='relative mx-auto flex flex-col lg:w-11/12 w-[95%] max-w-maxContent  text-richblack-100 items-center xlg:mt-40 lg:mt-32 xmd:mt-24 smd:mt-36 md:mt-28 sm:mt-24 xs:mt-36  xxs:mt-24 mt-20  gap-10 pb-16'>

                    <div className=' mx-auto  flex text-center '>

                        <Quote />

                    </div>

                </div>

            </section>


            {/* --------------------  Section 3 (founding story, vision and misison) ------------------------- */}


            <section>

                <div className='relative mx-auto flex flex-col lg:w-11/12 w-[95%] max-w-maxContent  text-richblack-100 items-center '>

                    {/* ------------------------- upper Container  -------------------- */}

                    <div className='flex md:flex-row flex-col md:gap-0 gap-16 mx-auto mmd:w-[95%] w-full md:justify-between  py-16 '>

                        {/* -----------------  left side  -------------------- */}

                        <div className='xl:w-[40%] md:w-[45%]  w-[85%] mx-auto  flex flex-col gap-5'>
                            <h1 className=' lg:text-4xl text-3xl font-semibold  text-richblack-5 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-orange-5'>Our Founding Story </h1>

                            <p className='text-[16px] text-richblack-300'>
                                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                            </p>

                            <p className='text-[16px] text-richblack-300'>

                                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                            </p>
                        </div>



                        {/* ---------------------  right side ----------------------- */}

                        <div className='xl:w-[40%] md:w-[45%] w-[85%] mx-auto  relative   flex md:flex-row items-center flex-col '>

                            <div className='absolute sm:w-[40%] lg:h-[200px] mmd:h-[150px] h-[120px]  pink-shadow  md:left-[4%] xl:top-[13%] xlg:top-[16%] lg:top-[22%] xmd:top-[25%] mmd:top-[30%] md:top-[32%] sm:left-[15%] sm:top-[5%] xs:left-[5%]'>

                            </div>
                            <img src={FoundingStory} alt="FoundingStory" className=' w-[470px] h-[278px]] relative z-10 '/>

                        </div>


                    </div>




                    {/* ------------------------- lower Container  -------------------- */}

                    <div className='flex md:flex-row flex-col md:gap-0 gap-16 md:justify-between   mmd:w-[95%] w-full  py-16'>

                        {/* -----------------  left side  -------------------- */}

                        <div className='xl:w-[40%] md:w-[45%] w-[85%] mx-auto   flex flex-col gap-5'>

                            <h1 className=' lg:text-4xl text-3xl font-semibold mtext-richblack-5  bg-clip-text text-transparent bg-gradient-to-r from-orange-5 to-yellow-100'>Our Vision</h1>

                            <p className='text-[16px] text-richblack-300'>
                                With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                            </p>

                        </div>



                        {/* ---------------------  right side ----------------------- */}

                        <div className='xl:w-[40%] md:w-[45%] w-[85%] mx-auto  flex flex-col gap-5'>

                            <h1 className=' lg:text-4xl text-3xl font-semibold  text-richblack-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-caribbeangreen-50'>Our Mission</h1>

                            <p className='text-[16px] text-richblack-300'>
                                Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                            </p>

                        </div>


                    </div>





                </div>




            </section>


            {/* -------------------------  Section 4 (stats compo) -------------------------------------- */}


            <section className='bg-richblack-700 mb-5'>

                <div className='relative mx-auto  lg:w-11/12 w-[95%] max-w-maxContent  text-richblack-100  mmd:mt-16 sm:mt-12 mt-8  '>

                    <StatsComponent></StatsComponent>

                </div>

            </section>



            {/* -------------------------  Section 5 (grid boxes)  -------------------------------------- */}


            <section>

                <div className='relative mx-auto flex flex-col lg:w-11/12 w-[95%] max-w-maxContent  text-richblack-100 items-center py-16 gap-10 '>

                    <LearningGrid></LearningGrid>


                </div>


            </section>


            {/* -------------------------  Section 6 (get in Touch form)  -------------------------------------- */}


            <section>

                <div className='relative mx-auto flex  lg:w-11/12 w-[95%] max-w-maxContent  text-richblack-100  pt-8  gap-10 '>

                    <ContactForm>
                    </ContactForm>


                </div>


            </section>


            {/* -------------------------  Section 7 (Reviews)  -------------------------------------- */}


            <section>

                <div className='relative mx-auto  lg:w-11/12 w-[95%] max-w-maxContent  text-richblack-100 items-center  border gap-10 py-4'>
                    <Reviews></Reviews>


                </div>


            </section>


            {/* ----------------------------------- Footer  --------------------------------------------- */}

            <div className='bg-richblack-800'>
                <Footer></Footer>
            </div>

















        </div>
    )
}

export default About