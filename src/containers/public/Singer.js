import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetArtist } from '../../apis'
import icons from '../../ultis/icon'

const { TiUserAdd, BsPlayFill } = icons

const Singer = () => {
    const { singer } = useParams()
    const [artistData, setArtistData] = useState(null)
    console.log(artistData)

    //Lấy dữ liệu của ca sĩ - nghệ sĩ
    useEffect(() => {
        const GetArtistData = async () => {
            const res = await apiGetArtist(singer)
            if (res.data.err === 0) {
                setArtistData(res.data.data)
            }
        }
        singer && GetArtistData()
    }, [singer])

    return (
        <div className='flex flex-col w-full' >
            <div className='relative' >
                <img src={artistData?.cover} alt='backgound' className='h-[400px] object-cover w-full' />
                <div className=' absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] text-white to-transparent px-60px' >
                    <div className='absolute bottom-0 pb-6 px-[60px]' >
                        <div className=' flex gap-8 items-center' >
                            <h1 className='text-[60px] font-bold' >{artistData?.name}</h1>
                            <span className='p-2 rounded-full bg-white cursor-pointer' ><BsPlayFill size={35} color='#0E8080' /></span>
                        </div>
                        <div className='flex items-center gap-4 mt-4' >
                            <span className='text-sm text-gray-300' >
                                {`${Number(artistData?.totalFollow.toFixed(1)).toLocaleString()} nguời quan tâm`}
                            </span>
                            <button
                                type='button'
                                className='bg-main-500 px-4 py-1 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1'
                            >
                                <span><TiUserAdd /></span>
                                <span className='text-xs opacity-90' >QUAN TÂM</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Singer