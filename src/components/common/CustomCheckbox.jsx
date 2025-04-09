import React from 'react'

const CustomCheckbox = ({ label, checked, onChange }) => {
  return (
    <label className="inline-flex items-center space-x-2 cursor-pointer">
      <div className="relative m-0">
        <input
          type="checkbox"
          className="peer appearance-none h-5 w-5 border-2 border-gray-300 rounded-md checked:bg-[#32D583] checked:border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-[#32D583]"
          checked={checked}
          onChange={onChange}
        />
        {/* Tickmark */}
        <svg
          className="absolute left-0 top-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <span className="text-gray-700">{label}</span>
    </label>
  )
}

export default CustomCheckbox