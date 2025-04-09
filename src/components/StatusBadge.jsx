import React from 'react'

const StatusBadge = ({status, statusType}) => {
    const statusClasses = {
        positive: "bg-teal-600/20 text-teal-600/60 ",
        warning: "bg-orange-100 text-orange-600/60",
        negative: "bg-red-100 text-red-800/60",
        neutral: "bg-gray-100 text-gray-500",
      };
  return (
    <span className={`px-2 py-1 rounded font-semibold text-xs ${statusClasses[statusType]}`}>
    {status}
  </span>
  )
}

export default StatusBadge