import React from 'react'
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
const Pagination = ({currentPage, totalPages, paginationRange, onPaginate}) => {
  return (
    <div className="flex justify-left mt-4">
                <div className="flex justify-center  bg-white rounded-md border border-gray-400/50">
                    <button
                        onClick={() => onPaginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2  rounded disabled:opacity-50 border-r border-gray-400/50"
                    >
                         <ChevronLeft size='20px'/>
                    </button>
                    <div className="flex gap-0 ">
                        {paginationRange.map((item, index) =>
                            item === "..." ? (
                                <span key={index} className="p-2 border-r border-gray-400/50">
                                    {item}
                                </span>
                            ) : (
                                <button
                                    key={index}
                                    onClick={() => onPaginate(item)}
                                    className={`p-2 w-10  ${currentPage === item ? "shadow-[0px_0px_0px_1px] shadow-emerald-400 bg-emerald-400/20 text-emerald-400  " : " text-gray-600 border-r border-gray-400/50"
                                        } `}
                                >
                                    {item}
                                </button>
                            )
                        )}
                    </div>
                    <button
                        onClick={() => onPaginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2  rounded disabled:opacity-50"
                    >
                        <ChevronRight size='20px'/>
                    </button>
                </div>
            </div>
  )
}

export default Pagination