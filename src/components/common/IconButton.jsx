import React from 'react'

const IconButton = ({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,

}) => {
    return (
        <button
        disabled = {disabled}
        onClick={onclick}
        type={type}
        className={`bg-yellow-50 sm:text-[16px] text-sm py-2 xxs:px-3 px-1 flex items-center gap-2 w-max text-richblack-900 font-medium shadow shadow-richblack-500 rounded-lg hover:scale-95 transition-all duration-300 ${customClasses}`}
        >
            {
                children ? (
                    <>
                        <span>
                            {text}
                        </span>
                        {children}
                    </>
                ) : (
                    <span>
                        {text}
                    </span>
                )
            }

        </button>
    )
}

export default IconButton