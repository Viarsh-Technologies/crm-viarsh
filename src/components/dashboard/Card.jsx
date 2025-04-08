import React from 'react'

const Card = ({children, heading}) => {
  return (
    <div className='bg-white border border-gray-300 rounded-lg flex flex-col w-full h-full p-5'>
       {
        heading?  <h2 className='text-lg font-semibold'>{heading}</h2> :''
       }
        {children}
    </div>
  )
}

export default Card