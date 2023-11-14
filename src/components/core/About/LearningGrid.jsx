import React from 'react'
import HighlightText from '../../common/HighlightText';
import { Link } from 'react-router-dom';
import CTAButton from '../../common/Button'

const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:
            "The learning process uses the namely online and offline.",
    },
    {
        order: 3,
        heading: "Certification",
        description:
            "You will get a certificate that can be used as a certification during job hunting.",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
            "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
            "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    },
];


const LearningGrid = () => {
    return (
        <div className='grid mx-auto lg:grid-cols-4 sm:grid-cols-3 grid-cols-1   md:w-[90%] w-[97%] '>
            {
                LearningGridArray.map((card, index) => {
                    return (
                        <div
                            key={index}
                            className={`${index === 0 && "lg:col-span-2"}
                                        ${card.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"}
                                        ${card.order === 3 && "lg:col-start-2"}
                                        ${card.order < 0 && "bg-transparent"}
                                      `}
                        >

                            {
                                card.order < 0 ? (
                                    <div className='flex flex-col gap-3 lg:pr-8 pr-2 items-center lg:items-start pt-4 sm:pb-4 pb-8 lg:py-0'>
                                        <h1 className='lg:text-4xl text-3xl text-richblack-5 font-semibold text-center lg:text-left '>{card.heading} <HighlightText text={card.highlightText}/></h1>
                                        <p className='sm:hidden inline lg:inline text-[16px] text-center lg:text-left text-richblack-300'>{card.description}</p>
                                        <div className='pt-8'>
                                        <CTAButton active={true} linkto={card.BtnLink}>{card.BtnText}</CTAButton>
                                        </div>
                                     
                                    </div>

                                ) :
                                    (
                                        <div className='flex flex-col gap-5 p-8'>
                                            <h1 className='text-richblack-5 text-lg font-semibold'>{card.heading}</h1>
                                            <p className='text-sm text-richblack-100'>{card.description}</p>
                                        </div>
                                    )
                            }

                        </div>
                    )
                })
            }

        </div>
    )
}

export default LearningGrid