import React, { useId } from 'react'

const Select = ({
    options,
    lable,
    className = "",
    ...props
}, ref) => {    
    return (
        <div className='w-full'>
            {lable && <label htmlFor={id} className=''></label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border-gray-200 w-full ${className}`}>
                {options?.map((option)=>(
                    <option key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)