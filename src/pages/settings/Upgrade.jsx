import React from 'react'
import Button from './Button'
import { Plus, Edit, Trash } from "lucide-react"; // Import commonly used icons
 
const Upgrade = ({title,actionText=Save,ActionIcon  ,onAction}) => {

  
   
  return (
    <div className='pb-3 border-b border-gray-300 flex justify-between'><h1 className='text-2xl font-semibold '>{title}</h1>
    {actionText && (
        <Button onClick={onAction} >
         {ActionIcon && <ActionIcon size={22} />}  <span className='text-[14px]'>{actionText}</span>
        </Button>
      )}
    </div>
  )
}

export default Upgrade