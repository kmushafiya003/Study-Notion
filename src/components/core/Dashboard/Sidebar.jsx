import React from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import Spinner from '../../common/Spinner'
import SidebarLink from './SidebarLink'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmModal from '../../common/ConfirmModal'

const Sidebar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [confirmationModal, setConfirmationModal] = useState(null)


    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);

    if (profileLoading || authLoading) {

        return (
            <Spinner />
        )
    }

    return (
        <div className=' relative '>

            <div className='hidden sm:flex  flex-col  smd:min-w-[230px] w-[200px]   h-[calc(99vh-3.5rem)] bg-richblack-800 py-8 border-2 border-pink-400'>

                {/* ----------------   SideBar Upper Links --------------------- */}

                <div className='flex flex-col gap-3'>

                    {
                        sidebarLinks.map((link) => {

                            if (link.type && user?.accountType !== link.type) {

                                return null;

                            }
                            return (
                                <div className='w-full' key={link.id}>
                                    <SidebarLink  link={link} iconName={link.icon} ></SidebarLink>
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
                confirmationModal && <ConfirmModal modalData={confirmationModal}  setConfirmationModal={setConfirmationModal} />
            }

        </div>
    )
}

export default Sidebar