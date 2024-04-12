import React from 'react'
import logo from '../image/logo.svg';
import { sidebarMenu } from '../ultis/menu';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Path from '../ultis/Path';

const notActiveStyle = 'py-2 px-[25px] font-bold text-[#32323D] text-[13px] flex items-center gap-[12px]'
const ActiveStyle = 'py-2 px-[25px] font-bold text-[#0F7070] text-[13px] flex items-center gap-[12px]'

const SidebarLeft = () => {

    const navigate = useNavigate()
    return (
        <div className='flex h-full flex-col bg-main-200' >
            <div onClick={() => navigate(Path.HOME)} className='w-full h-[70px] min-[850px]:py-[15px] min-[850px]:px-[25px] flex justify-start items-center cursor-pointer ' >
                <img src={logo} alt="logo" className='w-[120px] h-10 min-[850px]:block hidden ' />
                <img
                    src='https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.10.17/static/media/icon_zing_mp3_60.f6b51045.svg'
                    alt='logo'
                    className='w-[95px] h-[45px] min-[850px]:hidden'
                />
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
                        <span className='min-[850px]:inline hidden' >{item.text}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default SidebarLeft