import React, { useEffect } from 'react'
import Lists from '../../components/Lists'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

const Search_Songs = () => {
    const { searchData } = useSelector(state => state.music)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.getSearchSongs(searchData?.top?.id))
    }, [searchData])

    return (
        <div className='w-full px-[60px]'>

            <Lists />
        </div>

    )
}

export default Search_Songs