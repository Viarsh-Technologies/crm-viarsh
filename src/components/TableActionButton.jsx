import React from 'react';

const TableActionButton = ({ children, ...props }) => {
  return (
    <button
      className='border border-gray-200 text-sky-800 font-bold px-2 py-1 rounded-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition duration-150 ease-in-out' // Added hover/focus styles
      {...props}
    >
      {children}
    </button>
  );
};

export default TableActionButton;