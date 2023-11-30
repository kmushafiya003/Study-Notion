import React from 'react'
import {Swiper , SwiperSlide} from 'swiper/react'
// import Swiper styles
import 'swiper/css';
import "swiper/css/free-mode";
import "swiper/css/pagination"
import {FreeMode , Pagination} from 'swiper';
import CourseCard from './CourseCard';



const CourseSlider = ({courses}) => {

  console.log("courses in swiper : ", courses);
  return (
    <>
    {
      courses?.length ? (
       <Swiper>
        {
          courses?.map((course , index) => (
            <SwiperSlide key={index}>
                <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))
        }

       </Swiper>
      ) : (
        <div className='h-[80vh] flex items-center justify-center'>
          <p className='text-3xl text-yellow-50 font-semibold'>
            No Course Found
          </p>
        </div>
      )
    }
    </>
  )
}

export default CourseSlider