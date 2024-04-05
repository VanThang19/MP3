import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SongItem } from './'

const NewRelease = () => {
    const { newRelease } = useSelector(state => state.app)
    const [isActived, setIsActived] = useState(null)
    const [SongNewRelease, setSongNewRelease] = useState([])

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
                    className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 ${isActived === 0 ? 'text-white bg-green-800' : ''}`}
                    onClick={() => setIsActived(0)}
                >
                    TẤT CẢ
                </button>
                <button
                    type='button'
                    className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 ${isActived === 1 ? 'text-white bg-green-800' : ''}`}
                    onClick={() => setIsActived(1)}
                >
                    VIỆT NAM
                </button>
                <button
                    type='button'
                    className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 ${isActived === 2 ? 'text-white bg-green-800' : ''}`}
                    onClick={() => setIsActived(2)}
                >
                    QUỐC TẾ
                </button>
            </div>
            <div className='flex flex-wrap w-full justify-between' >
                {SongNewRelease?.slice(0, 15).map(item => (
                    <div key={item.encodeId} className='w-[45%] min-[1080px]:w-[30%]'>
                        <SongItem
                            thumbnail={item.thumbnail}
                            title={item.title}
                            artists={item.artistsNames}
                            releaseDate={item.releaseDate}
                            sid={item.encodeId}

                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewRelease