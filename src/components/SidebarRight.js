import React, { useState, useEffect } from 'react'
import icons from '../ultis/icon'
import { useSelector } from 'react-redux'
import { SongItem } from './'
import { apiGetDetailPlaylist } from '../apis'
import Scrollbars from 'react-custom-scrollbars-2';

const { RiDeleteBin5Line } = icons
const SidebarRight = () => {
    const [isPlaylistSidebar, setIsPlaylistSidebar] = useState(false)
    const { curSongData, curAlbumId, isPlaying, recentSongs, curSongId } = useSelector(state => state.music)
    const [playlist, setPlaylist] = useState()

    const fetchDetailPlaylist = async () => {
        const response = await apiGetDetailPlaylist(curAlbumId)
        if (response.data?.err === 0) setPlaylist(response.data?.data?.song?.items)
    }
    useEffect(() => {
        curAlbumId && fetchDetailPlaylist()
    }, [])
    useEffect(() => {
        if (curAlbumId, isPlaying) fetchDetailPlaylist()
    }, [curAlbumId, isPlaying])
    useEffect(() => {
        isPlaying && setIsPlaylistSidebar(false)
    }, [curSongId, isPlaying])
    return (
        <div className='flex flex-col text-xs w-full h-full'>
            <div className='h-[70px] w-full flex-none py-[14px] justify-between px-2 gap-8 flex items-center '>
                <div className='flex flex-auto justify-center bg-main-200 rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer' >
                    <span
                        className={`py-[5px] ${!isPlaylistSidebar && 'bg-main-100'} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
                        onClick={() => setIsPlaylistSidebar(prev => !prev)}
                    >
                        Danh sách phát
                    </span>
                    <span
                        className={`py-[5px] ${isPlaylistSidebar && 'bg-main-100'} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
                        onClick={() => setIsPlaylistSidebar(prev => !prev)}
                    >
                        nghe gần đây
                    </span>
                </div>
                <span className='rounded-full p-2 bg-main-100 cursor-pointer'>
                    <RiDeleteBin5Line size={15} />
                </span>
            </div>
            {isPlaylistSidebar
                ? <div className=' w-full flex-col flex-auto flex px-2' >
                    <Scrollbars autoHide style={{ width: '100%', height: '100%' }} >
                        {recentSongs && <div className='flex flex-col' >
                            {recentSongs?.map(item => (
                                <SongItem
                                    key={item.sid}
                                    thumbnail={item?.thumbnail}
                                    title={item?.title.length > 25 ? `${item?.title.slice(0, 25)}...` : item?.title}
                                    sid={item?.sid}
                                    artists={item?.artists.length > 17 ? `${item?.artists.slice(0, 17)}...` : item?.artists}
                                    size='w-[40px] h-[40px]'
                                />
                            ))}
                        </div>}
                    </Scrollbars>

                </div>
                : <div className=' w-full flex-col flex-auto flex px-2' >
                    <Scrollbars autoHide style={{ width: '100%', height: '100%' }} >
                        <SongItem
                            thumbnail={curSongData.thumbnail}
                            title={curSongData.title.length > 15 ? `${curSongData.title.slice(0, 15)}...` : curSongData.title}
                            sid={curSongData.encodeId}
                            artists={curSongData.artistsNames.length > 17 ? `${curSongData.artistsNames.slice(0, 17)}...` : curSongData.artistsNames}
                            size='w-[40px] h-[40px]'
                            style={'bg-main-500 text-white'}
                        />
                        <div className='flex flex-col text-black pt-[15px] px-2 pb-[5px]'>
                            <span className='font-semibold text-sm' >Tiếp theo</span>
                            <span className='opacity-70 text-xs flex gap-1' >
                                <span >Từ PLaylist</span>
                                <span className='font-semibold text-green-800'>{curSongData?.album?.title}</span>
                            </span>
                        </div>
                        {playlist && <div className='flex flex-col' >
                            {playlist?.map(item => (
                                <SongItem
                                    key={item.encodeId}
                                    thumbnail={item?.thumbnail}
                                    title={item?.title.length > 25 ? `${item?.title.slice(0, 25)}...` : item?.title}
                                    sid={item?.encodeId}
                                    artists={item?.artistsNames.length > 17 ? `${item?.artistsNames.slice(0, 17)}...` : item?.artistsNames}
                                    size='w-[40px] h-[40px]'
                                />
                            ))}
                        </div>}
                    </Scrollbars>
                </div>}
            <div className='w-full h-[200px]' ></div>
        </div>
    )
}

export default SidebarRight