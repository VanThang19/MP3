import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Section = () => {
    const { chill } = useSelector(state => state.app)
    const navigate = useNavigate()

    return (
        <div className='mt-12 px-[59px] flex flex-col gap-5' >
            <div className='flex justify-between items-center' >
                <h3 className='text-[20px] font-bold' >{chill?.title}</h3>
                <span className='text-xs'>TẤT CẢ</span>
            </div>
            <div className='flex items-center justify-between gap-[28px]' >
                {chill && chill?.items?.length > 0 && chill?.items.slice(0, 5).map(item => (
                    <div
                        key={item.encodeId}
                        className='flex flex-col gap-3 flex-auto w-1/5 text-sm cursor-pointer'
                        onClick={() => {
                            navigate(item?.link?.split('.')[0])
                        }}
                    >
                        <img src={item.thumbnailM} alt="avatar" className='w-full h-auto rounded-lg' />
                        <span className='flex flex-col text-[#696969]' >
                            <span>{item.title}</span>
                            <span>{`${item.sortDescription?.slice(0, 30)}...`}</span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
// memo : hạn chế rerender không cần thiết
export default memo(Section)