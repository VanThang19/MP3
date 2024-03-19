import React, { memo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import icons from '../ultis/icon'

const { BsThreeDots, PiPlayCircleThin, GoHeart } = icons

const HoverMouse = ({ data, link, thumbnailM, artistsNames, sortDescription, title }) => {

    const navigate = useNavigate()
    const [isHover, setIsHover] = useState(false)
    const imageRef = useRef()

    const handleHover = () => {
        setIsHover(true)
        imageRef.current.classList?.remove('animate-scale-down-image')
        imageRef.current.classList?.add('animate-scale-up-image')
    }
    const handleHoverLeave = () => {
        setIsHover(false)
        imageRef.current.classList?.remove('animate-scale-up-image')
        imageRef.current.classList?.add('animate-scale-down-image')
    }
    return (
        <div
            className='flex flex-col justify-start gap-3 flex-auto w-1/5 text-sm cursor-pointer'
            onClick={() => {
                navigate(link?.split('.')[0], { state: { playAlbum: false } })
            }}
        >   <div
            onMouseLeave={handleHoverLeave}
            onMouseEnter={handleHover}
            className='w-full relative overflow-hidden rounded-lg'>
                {isHover && <div className='absolute top-0 bottom-0 z-40 right-0 left-0 bg-overlay-30 rounded-lg text-white flex items-center justify-center gap-3' >
                    <span><GoHeart size={25} /></span>
                    <span
                        onClick={(e) => {
                            e.stopPropagation()//chặn nổi bọt 
                            navigate(link?.split('.')[0], { state: { playAlbum: true } })
                        }}
                    >
                        <PiPlayCircleThin size={50} />
                    </span>
                    <span><BsThreeDots size={25} /></span>
                </div>}
                <img ref={imageRef} src={thumbnailM} alt="avatar" className='w-full h-auto rounded-lg' />
            </div>
            <span className='flex flex-col text-[#333232]' >
                <span className='font-semibold' >{title}</span>
                {data?.sectionId === 'h100' ? <span> {artistsNames} </span> : <span>{sortDescription?.length >= 40 ? `${sortDescription?.slice(0, 30)}...` : sortDescription}</span>}
            </span>
        </div>
    )
}

export default memo(HoverMouse)