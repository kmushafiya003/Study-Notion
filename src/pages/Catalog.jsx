import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apiLinks';
import { getCatalogPageData } from '../services/operations/CatalogCourse';
import CourseSlider from '../components/core/Category/CourseSlider';
import CourseCard from '../components/core/Category/CourseCard';
import { TiRadarOutline } from 'react-icons/ti';

const Catalog = () => {

  const { catalogName } = useParams();

  const [catalogPageData, setCatalogPageData] = useState();
  const [categoryId, setCategoryId] = useState("");


  //fetch all categories to find specific Id of selected category

  useEffect(() => {

    const getCategoryId = async () => {

      const response = await apiConnector("GET", categories.GET_CATEGORIES_API);
      const category_id = response?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;



      setCategoryId(category_id);

    }

    getCategoryId();

  }, [catalogName]);

  //calling api for fetching courses of given ID

  useEffect(() => {

    const getCategorydetails = async () => {
      try {

        const result = await getCatalogPageData(categoryId);
        // console.log("Printing result : ", result);
        setCatalogPageData(result);


      } catch (err) {
        console.log("Error while Calling Category Page Detail : ", err);
      }

    }

    if (categoryId) {
      getCategorydetails();
    }



  }, [categoryId]);


  return (
    <div className='mt-14 '>


      <div className='relative bg-richblack-800   text-richblack-100  '>

        {/* ---------------------------- Upper part  --------------------------- */}

        <div className=' mx-auto xmd:px-2 md:px-6 sm:px-8 px-6  lg:w-10/12 md:w-[95%] w-full flex flex-col md:gap-y-8 gap-y-6  py-14'>

          <p className="text-sm text-richblack-300">{`Home / Catalog / `}
            <span className='text-yellow-25'>{catalogPageData?.selectedCategory.name}</span></p>
          <h1 className="sm:text-3xl text-2xl text-richblack-5">{catalogPageData?.selectedCategory.name}</h1>
          <p className="max-w-[870px] text-richblack-200 sm:text-[16px] text-sm">{catalogPageData?.selectedCategory.description}</p>

        </div>

        {/* -------------------------------- ALL SECTIONS ----------------------------- */}

        <div className='bg-richblack-900 sm:pt-12 pt-8'>

          {/* --------------------------- Section 1 -------------------------------- */}

          <section className='lg:w-10/12 w-[95%] mx-auto max-w-maxContent relative flex flex-col gap-y-10  pb-12 px-4 lg:px-0'>

            {/* ---------------- header ------------------ */}

            <h2 className="section_heading">Course to get you started</h2>

            <div className='flex flex-col gap-y-6'>

              {/* ---------------- Filter  ------------------ */}
              {/* <div className='flex gap-x-5 text-lg'>
                <p className='cursor-pointer'>Most Popular</p>
                <p className='cursor-pointer'>New</p>
              </div> */}


              {/* ------------- Courses ------------------------- */}

              <div>
                <CourseSlider courses={catalogPageData?.selectedCategory?.courses} />
              </div>

            </div>

          </section>


          {/* ----------------------------- Section 2 ------------------------------------ */}

          <section className='lg:w-10/12 w-[95%] mx-auto max-w-maxContent relative flex flex-col gap-y-10  pb-12 px-4 lg:px-0'>

            {/* ---------------- header ------------------ */}
            <h2 className='section_heading'>
              {
                catalogPageData?.differentCategory?.name ? `Top Courses in ${catalogPageData?.differentCategory?.name}` : `Top Courses in Different Category`
              }
            </h2>

            {/* ------------- Courses ------------------------- */}
            <div>
              <CourseSlider courses={catalogPageData?.differentCategory?.courses} />
            </div>

          </section>

          {/* ----------------------------- Section 3 ------------------------------------ */}

          <section className='lg:w-10/12 w-[95%] mx-auto max-w-maxContent relative flex flex-col gap-y-10  pb-12 px-4 lg:px-0'>

            {/* --------------------- heading ----------------------- */}

            <h2 className='section_heading'>Frequently Bought</h2>

            {/* --------------- courses  ----------------- */}

            <div className='py-8'>

              <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-x-12 lg:gap-x-8 gap-y-12  sm:px-10 xs:px-8 px-0 md:px-0'>

                {
                  catalogPageData?.mostSellingCourses.slice(0, 6).map((course, index) => (
                    <CourseCard course={course} key={index} Height={"h-[300px]"} fullRounded={TiRadarOutline} />
                  ))

                }


              </div>


            </div>

            <div>

            </div>
          </section>
        </div>

      </div>


      {/* -----------------------Footer--------------------- */}
      <div className='bg-richblack-800'>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default Catalog