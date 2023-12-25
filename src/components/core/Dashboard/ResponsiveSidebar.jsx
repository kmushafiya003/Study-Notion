
import { RiCloseLine } from 'react-icons/ri'
import { useRef } from 'react'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Spinner from '../../common/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../services/operations/authAPI'
import { sidebarLinks } from '../../../data/dashboard-links'
import SidebarLink from './SidebarLink'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmModal from '../../common/ConfirmModal'


const ResponsiveSidebar = ({ open, setOpen }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [confirmationModal, setConfirmationModal] = useState(null)


  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);


  const myRef = useRef(null);


  useOnClickOutside(myRef, () => setOpen(false));

  if (profileLoading || authLoading) {

    return (
      <Spinner />
    )
  }




  return (


    <div className={`visible sm:invisible  fixed inset-0  z-[9999] overflow-auto bg-white bg-opacity-10  backdrop-blur-sm text-richblack-5 transiton-all duration-300
    
    `}>


      <div className={` bg-richblack-800  border border-richblack-600 relative top-2 xs:w-[350px] w-[250px]   rounded-lg xs:text-lg text-[16px]  h-[500px] z-50 bg-opacity-90   shadow shadow-richblack-600 animation-left
     
     
   `} ref={myRef} onClick={(event) => event.stopPropagation()} >

        {/* ------------- close menu -------------- */}
        <div className='w-full  flex justify-end mt-5 cursor-pointer text-2xl hover:text-yellow-25' onClick={() => setOpen(false)}>
          <RiCloseLine className='mr-5'></RiCloseLine>

        </div>


        {/* -------------- links ----------------- */}

        <div className=' relative '>

          <div className='flex  flex-col   py-6 '>

            {/* ----------------   SideBar Upper Links --------------------- */}

            <div className='flex flex-col gap-3'>

              {
                sidebarLinks.map((link) => {

                  if (link.type && user?.accountType !== link.type) {

                    return null;

                  }
                  return (
                    <div className='w-full'>
                      <SidebarLink key={link.id} link={link} iconName={link.icon} ></SidebarLink>
                    </div>

                  )

                })
              }



            </div>

            {/* -------------------   horizontal rule  ----------------------- */}

            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'>

            </div>



            {/* --------------------  Sidebar Lower Links --------------------------- */}

            <div className='flex flex-col gap-3'>

              {/* -------------- settings ---------------- */}

              <SidebarLink
                link={{ name: "Settings", path: "dashboard/settings" }}
                iconName="VscSettingsGear"
              />

              {/* ------------------- Logout --------------------- */}

              <button
                onClick={() => {
                  setConfirmationModal({
                    text1: "Are You Sure ?",
                    text2: "You will be logged out from your Account",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }}
                className='text-sm font-medium text-richblack-300 px-8 py-2 hover:text-yellow-50 transition-all duration-500 '
              >
                <div className='flex flex-row items-center gap-x-2'>

                  <VscSignOut className='text-lg ' />
                  <span>Logout</span>

                </div>

              </button>


            </div>


          </div>

          {
            confirmationModal && <ConfirmModal modalData={confirmationModal} setConfirmationModal={setConfirmationModal} />
          }

        </div>





      </div>

    </div>





  )
}

export default ResponsiveSidebar