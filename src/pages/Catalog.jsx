import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apiLinks';
import { getCatalogPageData } from '../services/operations/CatalogCourse';
import CourseSlider from '../components/core/Category/CourseSlider';
import CourseCard from '../components/core/Category/CourseCard';

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
        console.log("Printing result : ", result);
        setCatalogPageData(result);


      } catch (err) {
        console.log("Error while Calling Category Page Detail : ", err);
      }

    }

    getCategorydetails();

  }, [categoryId]);


  return (
    <div className='mt-14 '>

      {/* ---------------------------- Upper part  --------------------------- */}
      <div className='relative bg-richblack-800  max-w-maxContent  text-richblack-100  '>

        <div className=' mx-auto  lg:w-10/12 w-[95%] flex flex-col gap-y-3  py-16 '>

          <p className="text-sm text-richblack-300">{`Home / Catalog / `}
            <span className='text-yellow-25'>{catalogPageData?.selectedCategory.name}</span></p>
          <h1 className="text-3xl text-richblack-5">{catalogPageData?.selectedCategory.name}</h1>
          <p className="max-w-[870px] text-richblack-200">{catalogPageData?.selectedCategory.description}</p>

        </div>

        {/* -------------------------------- ALL SECTIONS ----------------------------- */}

        <div className='bg-richblack-900 pt-12'>

          {/* --------------------------- Section 1 -------------------------------- */}

          <section className='lg:w-10/12 w-[95%] mx-auto max-w-maxContent relative flex flex-col gap-y-5  pb-12'>

            {/* ---------------- header ------------------ */}

            <h2 className="section_heading">Course to get you started</h2>

            <div>

              {/* ---------------- Filter  ------------------ */}
              <div className='flex gap-x-3'>
                <p>Most Popular</p>
                <p>New</p>
              </div>


              {/* ------------- Courses ------------------------- */}

              <div>
                <CourseSlider courses={catalogPageData?.selectedCategory?.courses} />
              </div>

            </div>

          </section>


          {/* ----------------------------- Section 2 ------------------------------------ */}

          <section className='lg:w-10/12 w-[95%] mx-auto max-w-maxContent relative flex flex-col pb-12 '>

            {/* ---------------- header ------------------ */}
            <h2 className='section_heading'>Top Courses in {catalogPageData?.selectedCategory.name}</h2>

            {/* ------------- Courses ------------------------- */}
            <CourseSlider courses={catalogPageData?.differentCategory?.courses} />
          </section>

          {/* ----------------------------- Section 3 ------------------------------------ */}

          <section className='lg:w-10/12 w-[95%] mx-auto max-w-maxContent relative flex flex-col pb-12 '>

            {/* --------------------- heading ----------------------- */}

            <h2 className='section_heading'>Frequently Bought</h2>

            {/* --------------- courses  ----------------- */}

            <div className='py-8 border border-yellow-300'>

              <div className='grid grid-cols-1 lg:grid-cols-2 border border-pink-400'>

                {
                  catalogPageData?.mostSellingCourses.slice(0,6).map((course , index) => (
                    <CourseCard course={course} key={index} Height={"h-[400px]"} />
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