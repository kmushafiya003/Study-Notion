import React from 'react'
import { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import HighlightText from '../../common/HighlightText';
import CourseCard from './CourseCard';


const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skill paths",
  "Career paths",
]

const ExploreMore = () => {

  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  // console.log("Current Tab : ", currentTab);


  // const [index ,setIndex] = useState(0)
  // console.log("I am index : " , index)

  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  // console.log("Courses : ", courses);

  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);
  // console.log("CurrentCard : ", currentCard);



  const setMyCards = (value) => {

    setCurrentTab(value);


    const result = HomePageExplore.filter((course) => 
      course.tag === value
    );

    setCourses(result[0].courses);
    console.log("I am result : ", result);

    setCurrentCard(result[0].courses[0].heading);

  }

  return (
    <div className=' w-full flex flex-col items-center lg:mt-20 md:mt-8 sm:mt-6 pt-10 gap-3 md:mb-[220px] sm:mb-[820px] mb-[790px] relative '>

      <div className='lg:text-4xl text-3xl font-semibold text-center'>
        Unlock the <HighlightText text={"Power of Code"}></HighlightText>
      </div>
      <p className='text-richblack-300 text-[16px] '>Learn to build anything you can Imagine</p>


      {/* ----------------Tabs -------------------------- */}

      <div className=' hidden sm:flex flex-row md:gap-4 gap-2 bg-richblack-700 rounded-full py-1 md:px-4 px-2 transition-all duration-300 border-richblack-100 lg:mb-20 md:mb-8'>
        {
          tabsName.map((tab, index) => {
            return (
              <div key={index}
                className={`text-[16px] flex flex-row items-center gap-2 px-3 py-1 rounded-full
                ${currentTab === tab ? "bg-richblack-900 text-richblack-5 font-medium"
                    : "text-richblack-200"}
                 transition-all duration-300 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`  }
                onClick={() => setMyCards(tab)}>
                {tab}
              </div>
            )
          })
        }
      </div>

      {/* ------------------- Cards --------------------- */}
      <div className=' flex md:flex-row flex-col md:justify-center lg:w-[95%] md:w-full w-[80%]  mx-auto lg:gap-6 md:gap-4 sm:gap-8 gap-5  absolute
        lg:top-[90%] top-[110%] '>
        {
          courses.map((course, index) => {
            return (

              <CourseCard key={index} course={course} currentCard={currentCard} setCurrentCard={setCurrentCard}></CourseCard>

            )
          })
        }
      </div>


    </div>
  )
}

export default ExploreMore