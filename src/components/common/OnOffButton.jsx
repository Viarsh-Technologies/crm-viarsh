import React, { useState } from 'react'

const OnOffButton = () => {
    const [isActive, setIsActive] = useState(false)
  return (
    <button className={`${ !isActive? 'bg-gray-200 justify-start': 'bg-brand-green justify-end'} rounded-full h-auto w-9 flex p-[2px] cursor-pointer `} onClick={()=>setIsActive(!isActive)}>
        <span className='w-4 h-4 bg-white inline-block rounded-full'></span></button>
  )
}

export default OnOffButton