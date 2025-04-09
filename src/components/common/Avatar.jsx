import React, { useState } from 'react'
import placeholderImg from "../../assets/avatar_placeholder.png"; // Adjust the path as needed

const Avatar = ({src, size = 90 }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div   className='border border-gray-200 rounded-full flex justify-center items-center overflow-hidden' style={{width:size, height:size}} >
      <img src={imgSrc || placeholderImg } onError={() => setImgSrc(placeholderImg)} style={{width:size, height:size}} className='object-cover' />
    </div>
  )
}

export default Avatar 