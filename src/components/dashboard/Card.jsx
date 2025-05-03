import React from 'react'

// Card.js
const Card = ({children, heading}) => {
  return (
    <div className='bg-white border border-gray-300 rounded-lg flex flex-col w-full h-full'>
      {
        heading && <h2 className='text-lg font-semibold p-5 pb-0'>{heading}</h2>
      }
      <div className='p-5 pt-4'>{children}</div>
    </div>
  )
}


export default Card;