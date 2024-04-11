import React, { useState, useEffect, memo } from 'react'
import ListItemSong from './ListItemSong'
import { useNavigate } from 'react-router-dom'

const Rankbox = ({ data, isHideAlbum, number, link }) => {

    const [isshowFull, setIsShowfull] = useState(false)
    const [songs, setSongs] = useState(null)
    const navigate = useNavigate()


    //showsongs
    useEffect(() => {
        if (!isshowFull) {
            setSongs(data?.filter((i, index) => index < number))
        } else {
            setSongs(data)
        }
    }, [isshowFull, data])
    return (
        <div className='w-full' >
            <div className='mt-4'>
                {songs?.map((item, index) => (
                    <ListItemSong
                        songData={item}
                        key={item.encodeId}
                        isHideNode
                        order={index + 1}
                        isHideAlbum={isHideAlbum}
                    />
                ))}
            </div>
            <div className='flex w-full justify-center items-center cursor-pointer' >
                <button
                    onClick={() => link ? navigate(link.split('.')[0]) : setIsShowfull(prev => !prev)}
                    type='button'
                    className='px-6 my-4 py-2 border border-[#0E8080] rounded-l-full rounded-r-full text-sm text-[#065f46]'
                >{isshowFull ? 'Ẩn bớt' : 'Xem tất cả'}</button>
            </div>
        </div>
    )
}

export default memo(Rankbox)