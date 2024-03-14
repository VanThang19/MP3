import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as apis from '../apis'
import icons from '../ultis/icon'
import * as actions from '../store/actions'
import moment from 'moment'
import { toast } from 'react-toastify'



const { GoHeart, GoHeartFill, BsThreeDots, IoMdSkipForward, IoMdSkipBackward, IoRepeatOutline, PiShuffleFill, BsPauseFill, BsPlayFill, PiRepeatOnceFill } = icons
var intervalId
const Player = () => {

    const [audio, setAudio] = useState(new Audio())
    const dispatch = useDispatch()
    const { curSongId, isPlaying, songs } = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null)
    const thumbRef = useRef()
    const [curSeconds, setcurSeconds] = useState(0)
    const trackRef = useRef()
    const [isShuffle, setIsShuffle] = useState(false)
    const [repeatMode, setRepeatMode] = useState(0)


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
                audio.pause()
                setAudio(new Audio(res2.data.data['128']))
            } else {
                audio.pause()
                setAudio(new Audio())
                dispatch(actions.play(false))
                toast.warn(res2?.data.msg)
                setcurSeconds(0)
                thumbRef.current.style.cssText = `right :100%`
            }
        }
        fetchDetailSong()
    }, [curSongId])

    // .play(true) : Hàm bất đồng bộ || https://developer.chrome.com/blog/play-request-was-interrupted?hl=vi : fix lỗi
    //animation processbar
    useEffect(() => {
        intervalId && clearInterval(intervalId);
        audio.pause();
        audio.load();
        if (isPlaying) {
            audio.play()
                .then(() => {
                    intervalId = setInterval(() => {
                        let percent = Math.round(audio.currentTime * 10000 / songInfo.duration) / 100; //curentTime : tgian hiện tại || duration : tổng tgian bài hát 
                        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
                        setcurSeconds(Math.round(audio.currentTime));
                    }, 100);
                })
                .catch((error) => { // Handle playback errors

                });
        }
    }, [audio, isPlaying]);

    //end music
    useEffect(() => {
        const handleEnd = () => {
            if (isShuffle) {
                handleShuffle()
            } else if (repeatMode) {
                repeatMode === 1 ? handleRepeatOne() : handleNextSong()
            } else {
                audio.pause()
                dispatch(actions.play(false))
            }
        }
        audio.addEventListener('ended', handleEnd)

        return () => {
            audio.removeEventListener('ended', handleEnd)
        }
    }, [audio, isShuffle, repeatMode])

    // handle play music
    const handleTogglePlayMusic = () => {
        if (isPlaying) {
            audio.pause()
            dispatch(actions.play(false))
        } else {
            audio.play()
            dispatch(actions.play(true))
        }
    }
    // click - hover processbar
    const handleClickProcessbar = (e) => {
        const trackRect = trackRef.current.getBoundingClientRect()
        const percent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100 // tính toán tỉ lệ % đã chạy trên thanh nhạc
        //e.clientX: lấy vị trí trục ngang X || trackRect.left : vị trí trên thanh phát nhạc từ bên trái || trackRect.width : lấy khoảng cách click trên thanh phát nhạc
        thumbRef.current.style.cssText = `right: ${100 - percent}%`; // cập nhật vị trí
        audio.currentTime = percent * songInfo.duration / 100 // cập nhật tgian phát hiện tại
        setcurSeconds(Math.round(percent * songInfo.duration / 100))
    }
    // handleclick next song
    const handleNextSong = () => {
        if (songs) {
            let currentSongIndex // tạo mảng rỗng 
            songs?.forEach((item, index) => {
                if (item.encodeId === curSongId) currentSongIndex = index
            })
            dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId))
            dispatch(actions.play(true))
        }
    }
    //handleclick back song 
    const handleBackSong = () => {
        if (songs) {
            let currentSongIndex
            songs?.forEach((item, index) => {
                if (item.encodeId === curSongId) currentSongIndex = index
            })
            dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId))
            dispatch(actions.play(true))
        }
    }
    //handle ramdom music
    const handleShuffle = () => {
        const ramdomIndex = Math.round(Math.random() * songs?.length) - 1
        dispatch(actions.setCurSongId(songs[ramdomIndex].encodeId))
        dispatch(actions.play(true))
    }
    // handle repeatOne
    const handleRepeatOne = () => {
        audio.play()
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
            <div className='w-[40%] flex-auto flex items-center justify-center gap-2 flex-col py-2' >
                <div className='flex gap-8 justify-center items-center'>
                    <span
                        onClick={() => setIsShuffle(prev => !prev)}
                        className={`cursor-pointer ${isShuffle ? 'text-purple-700' : 'text-black'}`}
                        title='Bật phát ngẫu nhiên' >
                        <PiShuffleFill size={24} /></span>
                    <span onClick={handleBackSong} className={`${!songs ? 'text-gray-500' : 'cursor-pointer'}`} ><IoMdSkipBackward size={24} /></span>
                    <span
                        className='p-1 border border-gray-700 cursor-pointer hover:text-emerald-500 rounded-full'
                        onClick={handleTogglePlayMusic}
                    >
                        {isPlaying ? <BsPauseFill size={30} /> : <BsPlayFill size={30} />}
                    </span>
                    <span onClick={handleNextSong} className={`${!songs ? 'text-gray-500' : 'cursor-pointer'}`} ><IoMdSkipForward size={24} /></span>
                    <span
                        onClick={() => setRepeatMode(prev => prev === 2 ? 0 : prev + 1)}
                        className={`cursor-pointer ${repeatMode && 'text-purple-700'}`}
                        title='Bật phát lại tất cả'
                    >
                        {repeatMode === 1 ? <PiRepeatOnceFill size={24} /> : <IoRepeatOutline size={24} />}
                    </span>
                </div>
                <div className='w-full flex items-center justify-center gap-2 text-xs '>
                    <span className=''>{moment.utc(curSeconds * 1000).format('mm:ss')}</span>
                    <div
                        className='w-3/4 h-[3px] hover:h-[6px] rounded-l-full rounded-r-full cursor-pointer relative bg-[rgba(0,0,0,0.1)]'
                        onClick={handleClickProcessbar}
                        ref={trackRef}
                    >
                        <div ref={thumbRef} className='absolute top-0 left-0 bottom-0 rounded-l-full rounded-r-full bg-[#0e8080] ' ></div>
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