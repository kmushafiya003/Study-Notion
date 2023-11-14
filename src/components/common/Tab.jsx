import React from 'react'

const Tab = ({tabData , accountType , setAccountType}) => {
  return (
    <div className='flex gap-3  w-max py-1 px-[6px] bg-richblack-800 rounded-full shadow-sm shadow-richblack-200'>
        {
            tabData.map((tab)=>{
                return(
                    <button 
                    key={tab.id} 
                    className={` py-2 px-4 rounded-full
                    ${tab.type === accountType ? "bg-richblack-900 text-white " : " text-richblack-100"}
                     transition-all duration-200`} 
                     onClick={()=> setAccountType(tab.type)}
                     >
                       {tab.tabName}
                    </button>
                )
            })
        }
    </div>
  )
}

export default Tab