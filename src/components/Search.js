import React from 'react'
import icons from '../ultis/icon'

const { GoSearch } = icons

const Search = () => {
    return (
        <div className='w-full flex items-center'>
            <span className='h-10 pl-4 bg-[#f3f3f3] flex items-center justify-center rounded-l-[20px] text-gray-600'>
                <GoSearch size={24} />
            </span>
            <input
                type='text'
                className=' outline-none bg-[#f3f3f3] px-4 py-2 w-full rounded-r-[20px] h-10 text-gray-600'
                placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
            />

        </div>
    )
}

export default Search