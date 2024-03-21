import React, { useState } from 'react'
import icons from '../ultis/icon'
import { useSelector } from 'react-redux'

const { RiDeleteBin5Line } = icons
const SidebarRight = () => {
    const [isPlaylistSidebar, setIsPlaylistSidebar] = useState(false)
    const { curSongData } = useSelector(state => state.music)
    console.log(curSongData)
    return (
        <div className='flex flex-col text-xs w-full'>
            <div className='h-[70px] w-full flex-none py-[14px] justify-between px-2 gap-8 flex items-center '>
                <div className='flex flex-auto justify-center bg-main-200 rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer' >
                    <span
                        className={`py-[5px] ${!isPlaylistSidebar && 'bg-main-100'} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
                        onClick={() => setIsPlaylistSidebar(prev => !prev)}
                    >
                        Danh sach phat
                    </span>
                    <span
                        className={`py-[5px] ${isPlaylistSidebar && 'bg-main-100'} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
                        onClick={() => setIsPlaylistSidebar(prev => !prev)}
                    >
                        nghe gan day
                    </span>
                </div>
                <span className='rounded-full p-2 bg-main-100 cursor-pointer'>
                    <RiDeleteBin5Line size={15} />
                </span>
            </div>
            <div>body</div>
        </div>
    )
}

export default SidebarRight