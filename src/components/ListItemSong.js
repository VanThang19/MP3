import React, { memo } from 'react'
import icons from '../ultis/icon'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions'

const { PiMusicNotesSimple } = icons

const ListItemSong = ({ songData, isHideAlbum }) => {

    const dispatch = useDispatch()
    // console.log(songData)
    return (
        <div
            className='flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer'
            onClick={() => {
                dispatch(actions.setCurSongId(songData?.encodeId))
                dispatch(actions.play(true))
                dispatch(actions.playAlbum(true))
                dispatch(actions.setReCent({ sid: songData?.encodeId, thumbnail: songData?.thumbnail, title: songData?.title, artists: songData?.artistsNames }))
            }}
        >
            <div className=' flex-1 flex items-center gap-3'>
                {!isHideAlbum && <span><PiMusicNotesSimple /></span>}
                <img src={songData?.thumbnail} alt='thumbnail' className='w-10 h-10 object-cover rounded-md' />
                <span className='flex flex-col w-full'>
                    <span className='text-sm font-semibold'>{songData?.title?.length > 30 ? `${songData?.title?.slice(0, 30)} ...` : songData?.title}</span>
                    <span className='text-xs opacity-70' >{songData?.artistsNames}</span>
                </span>
            </div>
            {!isHideAlbum && <div className='flex-1 flex items-center justify-center'>
                {songData?.album?.title?.length > 30 ? `${songData?.album?.title?.slice(0, 30)} ...` : songData?.album?.title}
            </div>}
            <div className='flex-1 flex justify-end text-xs opacity-70'>
                {moment.utc(songData?.duration * 1000).format('mm:ss')}
            </div>
        </div>
    )
}
// memo : hạn chế rerender không cần thiết
export default memo(ListItemSong)