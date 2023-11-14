import React from 'react'


const Stats = [
    {
        count : "5K",
        label :  "Active Students"
    },
    {
        count : "10+",
        label :  "Mentors"
    },
    {
        count : "200+",
        label :  "Courses"
    },
    {
        count : "50+",
        label :  "Awards"
    }
]

const StatsComponent = () => {
  return (
    <div className='flex sm:flex-row flex-col gap-8 sm:gap-0 justify-between  mx-auto sm:py-20 py-12 xmd:px-[120px] mmd:px-[90px] md:px-[50px]  sm:px-[30px] px-[20px]'>
        {
           Stats.map((stat , index)=> {
            return (
                <div key={index} className='flex flex-col items-center'>
                    <h2 className='md:text-3xl sm:text-2xl text-3xl text-richblack-5 font-bold'>{stat.count}</h2>
                    <h3 className='md:text-[24px] sm:text-lg text-[20px] text-richblack-500 font-semibold'>{stat.label}</h3>
                </div>
            )
           })
        }

    </div>
  )
}

export default StatsComponent