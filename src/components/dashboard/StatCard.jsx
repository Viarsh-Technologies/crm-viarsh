import { ArrowUp, ArrowUpRight } from 'lucide-react';
import React from 'react'
const StatCard = ({title, value,  description, percentageChange, layout}) => {
    
  return (
    <div  className={`flex justify-between  ${layout == '2'  ? 'flex-col gap-3 ':'items-center'} `}>
        <div>
            <h3 className='capitalize text-gray-500 '>{title}</h3>
            <p className='text-2xl font-bold'>{value}</p>
        </div>
        <div className={` ${layout == '2'  ? 'flex gap-2 ':'text-right'} `}>
            <p className='flex justify-end items-center'>
                {
                    percentageChange > 0 ? <ArrowUp size={18} className='text-emerald-600 rotate-45 -translate-y-[2px]' /> :<ArrowUp size={18} className='text-red-600 rotate-135 translate-y-[0px]' />
                }
                <span className={` ${percentageChange > 0 ? 'text-emerald-600':'text-red-600'} font-semibold text-sx`}>{percentageChange}</span></p>
            <p className='text-gray-400'>{description}</p>
        </div>
    </div>
  )
}

export default StatCard