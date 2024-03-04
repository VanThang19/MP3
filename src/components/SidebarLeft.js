import React from 'react'
import logo from '../image/logo.svg';
import { sidebarMenu } from '../ultis/menu';
import { NavLink } from 'react-router-dom';

const notActiveStyle = 'py-2 px-[25px] font-bold text-[#32323D] text-[13px] flex items-center gap-[12px]'
const ActiveStyle = 'py-2 px-[25px] font-bold text-[#0F7070] text-[13px] flex items-center gap-[12px]'

const SidebarLeft = () => {
    return (
        <div className='flex flex-col bg-[#DDE4E4]' >
            <div className='w-full h-[70px] py-[15px] px-[25px] flex justify-start items-center' >
                <img src={logo} alt="logo" className='w-[120px] h-10' />
            </div>
            <div className='flex flex-col'>
                {sidebarMenu.map(item => (
                    <NavLink
                        to={item.Path}
                        key={item.Path}
                        end={item.end}
                        className={({ isActive }) => isActive ? ActiveStyle : notActiveStyle}
                    >
                        {item.icons}
                        <span>{item.text}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default SidebarLeft