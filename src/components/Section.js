import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { HoverMouse } from './'

const Section = ({ data }) => {

    const { currentWidth } = useSelector(state => state.app)
    return (
        <div className='mt-12 px-[59px]  flex flex-col gap-5' >
            <div className='flex justify-between items-center' >
                <h3 className='text-[20px] font-bold' >{data?.title}</h3>
                <span className='text-xs'></span>
            </div>
            <div className='flex' >
                {data && data?.items?.length > 0 && data?.items.filter((item, index) => index <= (currentWidth < 600 ? 3 : currentWidth < 800 ? 5 : 7))?.map(item => (
                    <HoverMouse
                        key={item.encodeId}
                        data={data}
                        title={item.title}
                        link={item.link}
                        thumbnailM={item.thumbnailM}
                        sortDescription={item.sortDescription}
                    />
                ))}
            </div>
        </div>
    )
}
// memo : hạn chế rerender không cần thiết
export default memo(Section)