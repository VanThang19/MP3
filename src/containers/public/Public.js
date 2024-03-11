import React from 'react';
import { Outlet } from 'react-router-dom';
import { Player, SidebarLeft, SidebarRight, Header } from '../../components'

// Outlet - Route : được sử dụng để hiển thị nội dung của các tuyến con trong một tuyến cha
const Public = () => {
    return (
        <div className='w-full relative h-screen flex-col bg-main-300' >
            <div className='w-full h-full flex flex-auto'>
                <div className='w-[240px] min-h-screen flex-none border border-blue-500' >
                    <SidebarLeft />
                </div>
                <div className='flex-auto border border-red-500' >
                    <div className=' h-[70px] px-[59px] flex items-center mb-5'>
                        <Header />
                    </div>
                    <Outlet />
                </div>
                <div className='w-[329px] hidden 1600:flex flex-none border border-green-500 animate-slide-left' >
                    <SidebarRight />
                </div>
            </div>
            <div className='fixed bottom-0 left-0 right-0 h-[90px]'>
                <Player />
            </div>
        </div>
    );
};

export default Public;