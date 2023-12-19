import React from 'react';
import { useState, useEffect } from 'react';
import { NavbarLinks } from '../../data/navbar-links';
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { Link, matchPath } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ACCOUNT_TYPE } from '../../utils/constants';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProfileDropDown from '../core/Navbar/ProfileDropDown';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apiLinks';
import { BsChevronDown } from 'react-icons/bs';
import { TbMenu2 } from 'react-icons/tb'
import ResponsiveNavbar from './ResponsiveNavbar';





// const subLinks = [
//   {
//     title: "Python",
//     path: "/catalog/python"
//   },
//   {
//     title: "Web Development",
//     path: "/catalog/web-development"
//   }
// ]


const Navbar = () => {

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch()
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([]);
  const [menu, setMenu] = useState(false)

  useEffect(()=>{
    setMenu(false);
},[location.pathname]);



  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.GET_CATEGORIES_API);
      // console.log("Category Result: ", result);
      setSubLinks(result.data.data);

    }
    catch (err) {
      console.log("Could not fetch the category list");
      console.log(err);
    }
  }

  useEffect(() => {
    fetchSublinks();
    
  }, [])

  



  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }


  return (
    <>
    <div className='border-b-[1px] border-b-richblack-700 flex h-14 justify-center w-full  fixed top-0 z-[1000] bg-richblack-900 mb-20'>

      <div className='flex flex-row lg:w-11/12 smd:w-[95%] w-full  max-w-maxContent items-center justify-between md:px-8 sm:px-4 xs:px-8 px-3'>


        {/* -----------------  Logo   --------------- */}
        <Link to={"/"}>
          <img src={logo} alt="logo" width={160} height={42}/>
        </Link>

        {/* -------------------  NavLinks ----------------- */}


        <nav className='hidden sm:flex'>
          <ul className='flex flex-row md:gap-x-6 xs:gap-x-3 text-richblack-25 text-sm md:text-[16px]'>

            {
              NavbarLinks.map((link, index) => {
                return (
                  <li key={index}>
                    {
                      link.title === "Catalog" ?
                        (<div className='flex items-center gap-2 group  relative h-full '>
                          <p className={` cursor-pointer text-richblack-25 group-hover:text-richblack-5 transition-all duration-200`}>
                            {link.title}
                          </p>
                          <BsChevronDown className='text-sm group-hover:text-yellow-5  transition-all duration-200 ' />

                          {/* -------------- dropdown ------------------- */}

                          <div className='invisible absolute left-[50%] top-[30%] translate-x-[-50%] translate-y-[13%] flex flex-col gap-1 rounded-lg text-[15px] font-semibold bg-white p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[280px] z-10'>


                            {/* -------------------  triangle shape ------------------ */}

                            <div className='absolute left-[57%] top-0 translate-y-[-35%] bg-white h-6 w-6 rotate-45 rounded'>
                            </div>
                            

                            {
                              subLinks.length ? (

                                subLinks.map((subLink, index) => {

                                  return (
                                    <Link to={`/catalog/${subLink.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                       key={index} className='rounded-lg bg-transparent py-3 pl-4 hover:bg-richblack-50'>
                                      {subLink.name}
                                    </Link>
                                  )
                                })

                              ) :
                                (<div></div>)
                            }


                          </div>



                        </div>) :
                        (
                          <Link to={link?.path}>
                            <p className={`
                        ${matchRoute(link?.path) ? "text-yellow-25 font-semibold " : "text-richblack-25 border-animation hover:text-richblack-5 transition-all duration-200"}
                        `}>
                              {link.title}
                            </p>

                          </Link>
                        )
                    }

                  </li>
                )
              })
            }

          </ul>
        </nav>

        {/* ------------------ Login / Signup  / Dashboard / Cart  ------------------- */}
        <div className='flex xs:gap-x-5 md:gap-x-3 lg:gap-x-5 gap-x-2  items-center '>

          {
            user && user?.accountType === ACCOUNT_TYPE.STUDENT && (

              <Link to={"/dashboard/cart"} className='relative'>
                {
                  totalItems > 0 && (
                    <span className='w-3 h-3 p-[10px] rounded-full flex justify-center items-center text-[12px] text-richblack-5 bg-richblack-500 absolute left-[60%] top-[-35%] font-semibold'>{totalItems}</span>
                  )
                }
                <AiOutlineShoppingCart className='text-[22px] ' />

              </Link>
            )
          }
          {
            token === null && (
              <Link to="/login">
                <button className='hidden sm:flex py-2 md:px-3 px-2 border text-sm md:text-[16px] border-richblack-700 rounded-lg bg-richblack-800 text-richblack-100 hover:bg-richblack-900 hover:border-richblack-500 transition-all duration-200'>
                  Log in
                </button>
              </Link>
            )
          }
          {
            token === null && (
              <Link to={"/signup"}>
                <button className='hidden sm:flex py-2 md:px-3 px-2 text-sm md:text-[16px] border border-richblack-700 rounded-lg bg-richblack-800 text-richblack-100 hover:bg-richblack-900 hover:border-richblack-500 transition-all duration-200'>
                  Sign up
                </button>
              </Link>
            )
          }
          {
            token !== null && (
              <ProfileDropDown></ProfileDropDown>
            )
          }

          {/* Menu Icon  */}
          <div className='flex sm:hidden text-white text-lg cursor-pointer hover:text-yellow-100' onClick={() =>
             setMenu(true)}>
            <TbMenu2></TbMenu2>
          </div>




        </div>



      </div>

      {/* -------------- Responsive NavLinks ----------------- */}

   

{/* <ResponsiveNavbar menu={menu} setMenu={setMenu} matchRoute={matchRoute} subLinks={subLinks} /> */}


    </div>
    {
        menu && (
          <ResponsiveNavbar menu={menu} setMenu={setMenu} matchRoute={matchRoute} subLinks={subLinks} />
        )

      }
    </>
  )
}

export default Navbar