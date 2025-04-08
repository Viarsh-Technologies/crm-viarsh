import React from 'react'
import Button from '../common/Button'
import { Plus, Edit, Trash } from "lucide-react"; // Import commonly used icons
 
const PageTitle = ({title,actionText=Save,ActionIcon  ,onAction}) => {
   
  return (
    <div className='pb-3 border-b border-gray-300 flex justify-between'><h1 className='text-2xl font-semibold '>{title}</h1>
    {actionText && (
        <Button onClick={onAction} >
         {ActionIcon && <ActionIcon size={22} />}  {actionText}
        </Button>
      )}
    </div>
  )
}

export default PageTitle