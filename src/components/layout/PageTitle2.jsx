import React from 'react'
import Button from '../common/Button2'

const PageTitle2 = ({ title, actionText = "Save", ActionIcon, actionImg, onAction }) => {
  return (
    <div className='pb-3 border-b border-gray-300 flex justify-between items-center'>
      <h1 className='text-2xl font-semibold'>{title}</h1>
      {actionText && (
        <Button onClick={onAction}>
          {actionImg && <img src={actionImg} alt="icon" className="w-5 h-5 mr-2 inline" />}
          {!actionImg && ActionIcon && <ActionIcon size={22} className="mr-2" />}
          {actionText}
        </Button>
      )}
    </div>
  )
}

export default PageTitle2
