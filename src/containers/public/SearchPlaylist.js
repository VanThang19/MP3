import React, { useEffect, useState } from 'react'
import { apiGetArtist } from '../../apis'
import { useSelector } from 'react-redux'
import { HoverMouse } from '../../components'

const SearchPlaylist = () => {
    const { searchData } = useSelector(state => state.music)
    const [playlist, setPlaylist] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const res = await apiGetArtist(searchData?.top?.alias)
            if (res.data.err === 0) {
                setPlaylist(res.data.data.sections[1])
            }
        }
        fetch()
    }, [searchData])

    return (
        <div className='w-full flex-col flex gap-8 px-[44px]' >
            <h3>SearchPlaylist</h3>
            <div className='flex items-start flex-wrap justify-between' >
                {playlist && playlist?.items?.length > 0 && playlist?.items?.map(item => (
                    <HoverMouse
                        key={item.encodeId}
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

export default SearchPlaylist