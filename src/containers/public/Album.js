import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as apis from '../../apis'

const Album = () => {
    const { title, pid } = useParams()
    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            const response = await apis.apiGetDetailPlaylist(pid)
            console.log(response)
        }
        fetchDetailPlaylist()
    }, [pid])
    return (
        <div>Album</div>
    )
}

export default Album