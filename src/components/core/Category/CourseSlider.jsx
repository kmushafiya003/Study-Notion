import React from 'react'

import { Pagination,  Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import CourseCard from './CourseCard'



const CourseSlider = ({ courses }) => {

  // console.log("courses in swiper : ", courses);
  return (
    <>
      {
        courses?.length ? (
          <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          pagination={ true}
          modules={[Pagination , Autoplay ]}
          autoplay = {{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
            700: {
              slidesPerView: 2,
            },
         

          }}
          className="max-h-[30rem]  "
          
        >
            {
              courses?.map((course, index) => (
                <SwiperSlide key={index}

                >
                  <CourseCard course={course} Height={"h-[230px]"} fullRounded={false}  />
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

