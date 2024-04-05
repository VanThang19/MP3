import React, { useState } from 'react'
import icons from '../ultis/icon'
import * as actions from '../store/actions'
import { useDispatch } from 'react-redux'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import Path from '../ultis/Path'
import { IoCloseSharp } from 'react-icons/io5'

const { GoSearch } = icons

const Search = () => {
    const [keyword, setKeyword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { singer } = useParams()

    const handleSearch = async (e) => {
        if (e.keyCode === 13) { // nút enter
            dispatch(actions.search(keyword))
            navigate({
                pathname: `${Path.SEARCH}/${Path.ALL}`,
                search: createSearchParams({
                    q: keyword
                }).toString()
            })
        }
    }
    return (
        <div className='w-full flex relative items-center'>
            {keyword && <span onClick={() => setKeyword('')} className='absolute right-[16px] cursor-pointer ' ><IoCloseSharp />  </span>}
            <span className={`h-10 pl-4 ${singer ? 'bg-[rgba(0,0,0,0.2)] text-gray-200' : 'bg-[#f3f3f3]'} flex items-center justify-center rounded-l-[20px] text-gray-600`}>
                <GoSearch size={24} />
            </span>
            <input
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyUp={handleSearch}
                type='text'
                className={`outline-none px-4 ${singer ? 'bg-[rgba(0,0,0,0.2)] placeholder:text-gray-200' : 'bg-[#f3f3f3]'} py-2 w-full rounded-r-[20px] h-10 text-gray-600`}
                placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
            />

        </div>
    )
}

export default Search