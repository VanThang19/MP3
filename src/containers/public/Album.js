import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import * as apis from '../../apis'
import moment from 'moment'
import { Lists, AudioLoading } from '../../components'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import icons from '../../ultis/icon'

const { BsPlayFill } = icons

const Album = () => {

    const location = useLocation()

    const { pid } = useParams()
    const { curSongId, isPlaying, songs } = useSelector(state => state.music)
    const [playlistData, setplaylistData] = useState({})
    const dispatch = useDispatch()

    // lấy dữ liệu đổ về album
    useEffect(() => {
        dispatch(actions.setcurAlbumID(pid))
        const fetchDetailPlaylist = async () => {
            const response = await apis.apiGetDetailPlaylist(pid)
            if (response?.data.err === 0) {
                setplaylistData(response.data?.data)
                dispatch(actions.setPLaylist(response?.data?.data?.song?.items))
            }
        }
        fetchDetailPlaylist()
    }, [pid])

    // quản lí hover nút PLay lấy dữ liệu song
    useEffect(() => {
        if (location.state?.playAlbum) {
            const ramdomSong = Math.round(Math.random() * playlistData?.song?.items?.length) - 1
            dispatch(actions.setCurSongId(playlistData?.song?.items[ramdomSong]?.encodeId))
            dispatch(actions.play(true))
        }
    }, [pid, playlistData])
    return (
        <>
            <div className='w-full h-[90px]'>
            </div>
            <div className='flex gap-8 w-full h-full px-[59px]'>
                <div className='flex-none w-1/4 flex flex-col items-center gap-2'>
                    <div className='w-full relative overflow-hidden' >
                        <img
                            src={playlistData?.thumbnailM}
                            alt='thumbnailM'
                            className={`w-full object-contain ${isPlaying ? 'rounded-full animate-rotate-center' : 'rounded-md'} shadow-md`}
                        />
                        <div className={`absolute top-0 left-0 bottom-0 right-0 hover:bg-overlay-30 text-white flex items-center justify-center ${isPlaying && 'rounded-full'}`} >
                            <span className='p-3 border border-white rounded-full ' >
                                {isPlaying ? <AudioLoading /> : <BsPlayFill size={30} />}
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-1' >
                        <h3 className='text-[20px] font-bold items-center text-gray-800' >{playlistData?.title}</h3>
                        <span className='flex gap-2 items-center text-gray-500 text-xs' >
                            <span>Cập nhật :</span>
                            <span>
                                {moment.unix(playlistData?.contentLastUpdate).format("DD/MM/YYYY")}
                            </span>
                        </span>
                        <span className='flex gap-2 items-center text-gray-500 text-xs'> {playlistData?.artistsNames} </span>
                        <span className='flex gap-2 items-center text-gray-500 text-xs'> {`${Math.round(playlistData?.like / 1000)}K người yêu thích`} </span>
                    </div>
                </div>
                <Scrollbars style={{ width: '100%', height: '80%' }} >
                    <div className='flex-auto mb-40'>
                        <span className='text-sm' >
                            <span className='text-gray-600' > Lời tựa :  </span>
                            <span>{playlistData?.sortDescription}</span>
                        </span>

                        <Lists totalDuration={playlistData.song?.totalDuration} />

                    </div>
                </Scrollbars>
            </div>
        </>

    )
}

export default Album