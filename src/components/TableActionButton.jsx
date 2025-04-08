import React from 'react'

const TableActionButton = ({children}) => {
  return (
    <button className='border border-gray-200 text-sky-800 font-bold px-2 py-1 rounded-sm'>{children}</button>
  )
}

export default TableActionButton