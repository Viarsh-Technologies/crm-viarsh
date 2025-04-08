import React from 'react'
import logo from '../../assets/logo.svg'
const Logo = ({size=42}) => {
  return (
    <img src={logo} width={size}/>
  )
}

export default Logo