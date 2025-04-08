import { ChevronRight } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const Breadcrumbs = ({items}) => {
  return (
    <div className='py-2'>
        <ul className="flex items-center">
        {items.map((item, index) => (
          <li key={item.name} className="flex items-center">
            {item.path ? (
              <Link to={item.path} className="text-gray-400 hover:text-blue-600">
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-400">{item.name}</span>
            )}
            {index < items.length - 1 && (
              <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            )}
          </li>
        ))}
      </ul>
        </div>
  )
}

export default Breadcrumbs