import React, { memo } from 'react'
import { handleNumberFollow } from '../ultis/fn';

import { TiUserAdd } from "react-icons/ti";

const Artist = ({ image, title, follower }) => {
    return (
        <div className=' w-1/5 flex flex-col gap-[15px]' >
            <img src={image} alt='singer' className=' w-full object-contain rounded-full' />
            <div className='flex gap-1 flex-col items-center' >
                <span className='text-sm font-medium' >{title}</span>
                <span className='text-xs opacity-70' >{`${handleNumberFollow(follower)} quan tâm`}</span>
                <button
                    type='button'
                    className='bg-main-500 px-4 py-1 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1'
                >
                    <span><TiUserAdd /></span>
                    <span className='text-xs opacity-70' >QUAN TÂM</span>
                </button>
            </div>
        </div>
    )
}

export default memo(Artist)