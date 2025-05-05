import React from 'react';
import { Link } from 'react-router-dom';

const TableActionButton = ({ children, to = "/contactdetailpage", ...props }) => {
  return (
    <Link
      to={to}
      className="w-[54px] h-[24px] border border-gray-200 text-sky-800 font-bold px-2 py-1 rounded-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition duration-150 ease-in-out inline-block text-center flex items-center justify-center text-xs"
      {...props}
    >
      {children}
    </Link>
  );
};

export default TableActionButton;
