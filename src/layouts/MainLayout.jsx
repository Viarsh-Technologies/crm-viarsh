import React from 'react'
import SideNav from '../components/layout/SideNav'
import { Outlet } from 'react-router-dom'
import Logo from '../components/common/Logo'

const MainLayout = () => {
    return (
        <div className="flex flex-row min-h-screen bg-brand-surface relative" >
            <div className='bg-white border-r border-gray-300 p-3 flex flex-col items-center max-h-screen sticky top-0'>
                <div className='mb-4'><Logo size={48}/></div>
                <SideNav />
            </div>
            <div className="content py-3 px-7 w-full">
                <Outlet /> {/* Nested routes will be rendered here */}
            </div>
        </div>
    )
}

export default MainLayout