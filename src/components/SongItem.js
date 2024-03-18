import moment from 'moment'
import React, { memo } from 'react'
import 'moment/locale/vi'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'

const SongItem = ({ thumbnail, title, sid, artists, releaseDate }) => {
    const dispatch = useDispatch()
    return (
        <div
            onClick={() => {
                dispatch(actions.setCurSongId(sid))
                dispatch(actions.play(true))
            }}
            className=' w-[45%] min-[1080px]:w-[30%] flex-auto flex p-[10px] gap-[10px] hover:bg-main-200 rounded-md cursor-pointer' >
            <img src={thumbnail} alt='thumbnail' className='w-[60px] h-[60px] object-cover rounded-md' />
            <div className='flex flex-col' >
                <span className='text-sm font-semibold' >{title}</span>
                <span className='text-sm text-gray-700' >{artists}</span>
                <span className='text-sm text-gray-700' > {moment(releaseDate * 1000).fromNow()}</span>
            </div>
        </div>
    )
}

export default memo(SongItem)