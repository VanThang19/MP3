import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SongItem } from './'

const NewRelease = () => {
    const { newRelease } = useSelector(state => state.app)
    const [isActived, setIsActived] = useState(null)
    const [SongNewRelease, setSongNewRelease] = useState([])
    // useEffect(() => {
    //     isActived ? setSongNewRelease(newRelease?.items?.others) : setSongNewRelease(newRelease?.items?.vPop)
    // }, [isActived, newRelease])

    useEffect(() => {
        if (isActived === 0) {
            setSongNewRelease(newRelease?.items?.all);
        } else if (isActived === 1) {
            setSongNewRelease(newRelease?.items?.vPop);
        } else if (isActived === 2) {
            setSongNewRelease(newRelease?.items?.others);
        }
    }, [isActived, newRelease]);

    return (
        <div className='mt-12 px-[59px] flex flex-col gap-5' >
            <div className='flex justify-between items-center' >
                <h3 className='text-[20px] font-bold' >{newRelease?.title}</h3>
                <span className='text-xs'>TẤT CẢ</span>
            </div>
            <div className=' flex items-center gap-5 text-xs'>
                <button
                    type='button'
                    className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent ${isActived === 0 ? 'bg-green-800 text-white' : ''}`}
                    onClick={() => setIsActived(0)}
                >
                    TẤT CẢ
                </button>
                <button
                    type='button'
                    className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent ${isActived === 1 ? 'bg-green-800 text-white' : ''}`}
                    onClick={() => setIsActived(1)}
                >
                    VIỆT NAM
                </button>
                <button
                    type='button'
                    className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent ${isActived === 2 ? 'bg-green-800 text-white' : ''}`}
                    onClick={() => setIsActived(2)}
                >
                    QUỐC TẾ
                </button>
            </div>
            <div className='flex flex-wrap w-full' >
                {SongNewRelease?.slice(0, 15).map(item => (
                    <SongItem
                        key={item.encodeId}
                        thumbnail={item.thumbnail}
                        title={item.title}
                        artists={item.artistsNames}
                        releaseDate={item.releaseDate}
                    />
                ))}
            </div>
        </div>
    )
}

export default NewRelease