import moment from 'moment'
import React, { memo } from 'react'
import 'moment/locale/vi'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'

const SongItem = ({ thumbnail, title, sid, artists, releaseDate, order, percent, style }) => {
    const dispatch = useDispatch()
    return (
        <div
            onClick={() => {
                dispatch(actions.setCurSongId(sid))
                dispatch(actions.play(true))
            }}
            className={`w-full flex p-[10px] gap-[10px] rounded-md justify-between items-center cursor-pointer ${style || 'text-black hover:bg-main-200 '}`}>
            <div className='flex gap-4'>
                {order && <span className='m-auto' >{order}</span>}
                <img src={thumbnail} alt='thumbnail' className='w-[60px] h-[60px] object-cover rounded-md' />
                <div className='flex flex-col' >
                    <span className='text-sm font-semibold' >{title}</span>
                    <span className='text-xs opacity-70' >{artists}</span>
                    {releaseDate && <span className='text-sm text-gray-700' > {moment(releaseDate * 1000).fromNow()}</span>}
                </div>
            </div>
            {percent && <span className='font-bold' >{`${percent}%`}</span>}
        </div>
    )
}

export default memo(SongItem)