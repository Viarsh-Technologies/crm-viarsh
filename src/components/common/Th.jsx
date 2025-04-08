import React from 'react'

const Th = ({ children, className = "" }) => {
    return (
        <th className={`py-1 px-3 bg-[#F0F1FA] border-b border-gray-300 text-left ${className}`}>
            {children}
        </th>
    )
}

export default Th