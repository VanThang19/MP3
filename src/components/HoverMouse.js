import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HoverMouse = ({ data, link, thumbnailM, artistsNames, sortDescription, title }) => {
    const navigate = useNavigate()
    const [isHover, setIsHover] = useState(false)
    const handleHover = () => {
        setIsHover(true)
    }
    const handleHoverLeave = () => {
        setIsHover(false)
    }
    return (
        <div

            className='flex flex-col justify-start gap-3 flex-auto w-1/5 text-sm cursor-pointer'
            onClick={() => {
                navigate(link?.split('.')[0])
            }}
        >   <div
            onMouseLeave={handleHoverLeave}
            onMouseEnter={handleHover}
            className='w-full relative'>
                {isHover && <div className='absolute top-0 bottom-0 right-0 left-0 bg-overlay-30 rounded-md' ></div>}
                <img src={thumbnailM} alt="avatar" className='w-full h-auto rounded-lg' />
            </div>
            <span className='flex flex-col text-[#333232]' >
                <span className='font-semibold' >{title}</span>
                {data?.sectionId === 'h100' ? <span> {artistsNames} </span> : <span>{sortDescription?.length >= 40 ? `${sortDescription?.slice(0, 30)}...` : sortDescription}</span>}
            </span>
        </div>
    )
}

export default memo(HoverMouse)