import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as apis from '../apis'
import icons from '../ultis/icon'
import * as actions from '../store/actions'
import moment from 'moment'


const { GoHeart, GoHeartFill, BsThreeDots, IoMdSkipForward, IoMdSkipBackward, IoRepeatOutline, PiShuffleFill, BsPauseFill, BsPlayFill } = icons
var intervalId
const Player = () => {

    const audioEl = useRef(new Audio())
    const dispatch = useDispatch()

    const { curSongId, isPlaying } = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null)
    const [source, setSource] = useState(null)
    const thumbRef = useRef()
    const [curSeconds, setcurSeconds] = useState(0)


    // lấy dữ liệu đã gọi được từ api
    useEffect(() => {
        const fetchDetailSong = async () => {
            const [res1, res2] = await Promise.all([
                apis.apiGetDetailSong(curSongId),
                apis.apiGetSong(curSongId)
            ])
            if (res1.data.err === 0) {
                setSongInfo(res1.data.data)
            }
            if (res2.data.err === 0) {
                setSource(res2.data.data['128'])
            }
        }
        fetchDetailSong()
    }, [curSongId])

    //animation processbar
    useEffect(() => {
        if (isPlaying) {
            intervalId = setInterval(() => {
                let percent = Math.round(audioEl.current.currentTime * 10000 / songInfo.duration) / 100
                thumbRef.current.style.cssText = `right : ${100 - percent}%`
                setcurSeconds(Math.round(audioEl.current.currentTime))
            }, 50);
        } else {

            intervalId && clearInterval(intervalId)

        }

    }, [isPlaying])


    // .play(true) : Hàm bất đồng bộ || https://developer.chrome.com/blog/play-request-was-interrupted?hl=vi : fix lỗi
    useEffect(() => {
        const playAudio = async () => {
            try {
                await audioEl.current.pause(); // Dừng phát âm thanh hiện tại
                audioEl.current.src = source; // Đặt nguồn âm thanh mới
                await audioEl.current.load(); // Tải lại âm thanh mới
                if (isPlaying) await audioEl.current.play(); // Nếu đang phát, tiến hành phát âm thanh mới
            } catch (error) {
                // Xử lý lỗi nếu cần
            }
        };
        playAudio(); // Gọi hàm playAudio()
    }, [curSongId, source, isPlaying]);

    const handleTogglePlayMusic = () => {
        if (isPlaying) {
            audioEl.current.pause()
            dispatch(actions.play(false))
        } else {
            audioEl.current.play()
            dispatch(actions.play(true))
        }
    }

    return (
        <div className='bg-main-400 px-5 h-full flex py-2'>
            <div className='w-[30%] flex-auto flex gap-3 items-center' >
                <img src={songInfo?.thumbnail} alt='thumbnail' className='w-16 h-16 object-cover rounded-md' />
                <div className='flex flex-col' >
                    <span className='font-semibold text-gray-700 text-sm'>{songInfo?.title}</span>
                    <span className='text-xs text-gray-500'>{songInfo?.artistsNames}</span>
                </div>
                <div className='flex gap-4 pl-2'>
                    <span>
                        <GoHeart size={16} />
                    </span>
                    <span>
                        <BsThreeDots size={16} />
                    </span>
                </div>
            </div>
            <div className='w-[40%] flex-auto border flex items-center justify-center gap-2 flex-col border-blue-400 py-2' >
                <div className='flex gap-8 justify-center items-center'>
                    <span className='cursor-pointer' title='Bật phát ngẫu nhiên' ><PiShuffleFill size={24} /></span>
                    <span className='cursor-pointer' ><IoMdSkipBackward size={24} /></span>
                    <span
                        className='p-1 border border-gray-700 cursor-pointer hover:text-emerald-500 rounded-full'
                        onClick={handleTogglePlayMusic}
                    >
                        {isPlaying ? <BsPauseFill size={30} /> : <BsPlayFill size={30} />}
                    </span>
                    <span className='cursor-pointer' ><IoMdSkipForward size={24} /></span>
                    <span className='cursor-pointer' title='Bật phát lại tất cả' ><IoRepeatOutline size={24} /></span>
                </div>
                <div className='w-full flex items-center justify-center gap-2 text-xs '>
                    <span className=''>{moment.utc(curSeconds * 1000).format('mm:ss')}</span>
                    <div className='w-3/4 h-[3px] rounded-l-full rounded-r-full relative bg-[rgba(0,0,0,0.1)]'>
                        <div ref={thumbRef} className='absolute top-0 left-0 h-[3px] rounded-l-full rounded-r-full bg-[#0e8080] ' ></div>
                    </div>
                    <span >{moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
                </div>
            </div>
            <div className='w-[30%] flex-auto border border-blue-400' >
                Volume
            </div>
        </div>
    )
}

export default Player