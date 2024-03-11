import React, { memo } from 'react'
import icons from '../ultis/icon'
import moment from 'moment'

const { PiMusicNotesSimple } = icons

const ListItemSong = ({ songData }) => {
    // console.log(songData)
    return (
        <div className='flex justify-between items-center p-[10px]'>
            <div className=' flex-1 flex items-center gap-3'>
                <span><PiMusicNotesSimple /></span>
                <img src={songData?.thumbnail} alt='thumbnail' className='w-10 h-10 object-cover rounded-md' />
                <span className='flex flex-col'>
                    <span className='text-sm font-semibold'>{songData?.title?.length > 30 ? `${songData?.title?.slice(0, 30)} ...` : songData?.title}</span>
                    <span>{songData?.artistsNames}</span>
                </span>
            </div>
            <div className='flex-1 flex items-center justify-center'>
                {songData?.album?.title}
            </div>
            <div className='flex-1 flex justify-end'>
                {moment.utc(songData?.duration * 1000).format('mm:ss')}
            </div>
        </div>
    )
}

export default memo(ListItemSong)