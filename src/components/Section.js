import React, { memo } from 'react'

import { useNavigate } from 'react-router-dom'

const Section = ({ data }) => {

    const navigate = useNavigate()

    return (
        <div className='mt-12 px-[59px] flex flex-col gap-5' >
            <div className='flex justify-between items-center' >
                <h3 className='text-[20px] font-bold' >{data?.title}</h3>
                <span className='text-xs'>TẤT CẢ</span>
            </div>
            <div className='flex items-start justify-between gap-[28px]' >
                {data && data?.items?.length > 0 && data?.items.slice(0, 5).map(item => (
                    <div
                        key={item.encodeId}
                        className='flex flex-col justify-start gap-3 flex-auto w-1/5 text-sm cursor-pointer'
                        onClick={() => {
                            navigate(item?.link?.split('.')[0])
                        }}
                    >
                        <img src={item.thumbnailM} alt="avatar" className='w-full h-auto rounded-lg' />
                        <span className='flex flex-col text-[#333232]' >
                            <span className='font-semibold' >{item.title}</span>
                            {data?.sectionId === 'h100' ? <span> {item.artistsNames} </span> : <span>{item.sortDescription?.length >= 40 ? `${item.sortDescription?.slice(0, 30)}...` : item.sortDescription}</span>}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
// memo : hạn chế rerender không cần thiết
export default memo(Section)