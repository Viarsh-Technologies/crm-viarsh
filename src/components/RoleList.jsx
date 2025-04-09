import React, { useState } from 'react'

const RoleList = ({roles}) => {
    const [showAll, setShowAll] = useState(false);

    const handleToggle = () => {
      setShowAll(!showAll);
    };
  return (
    <ul className="flex flex-col gap-0">
    {roles.slice(0, showAll ? roles.length : 2).map((role, roleIndex) => (
      <li key={roleIndex}>
        <p className="font-semibold">
          {role.title}
          <span className="font-normal px-1">at</span>
          {role.company}
          <span className="px-1 font-md text-md">&#8226;</span>
          <span className="font-medium text-xs italic">{role.duration}</span>
        </p>
      </li>
    ))}
    {roles.length > 2 && (
      <li>
        <button
          onClick={handleToggle}
          className="text-md text-gray-400 text-sm mt-1 font-normal"
        >
          {showAll ? 'Show Less' : `Show More(${roles.length-2})`}
        </button>
      </li>
    )}
  </ul>
  )
}

export default RoleList