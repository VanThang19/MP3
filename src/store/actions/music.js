import actionTypes from "./actionTypes";
import * as apis from '../../apis'

export const setCurSongId = (sid) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    sid
})
export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag
})
export const playAlbum = (flag) => ({
    type: actionTypes.SET_ALBUM,
    flag
})

export const setPLaylist = (songs) => ({
    type: actionTypes.PLAYLIST,
    songs
})
export const setcurSongData = (data) => ({
    type: actionTypes.SET_CUR_SONG_DATA,
    data
})
export const setcurAlbumID = (pid) => ({
    type: actionTypes.SET_CUR_ALBUM_ID,
    pid
})
export const setReCent = (data) => ({
    type: actionTypes.SET_RECENT,
    data
})
export const search = (keyword) => async (dispatch) => {
    try {
        const response = await apis.apiSearch(keyword)
        if (response.data.err === 0) {
            dispatch({ type: actionTypes.SEARCH, data: response.data.data, keyword })
        } else {
            dispatch({ type: actionTypes.SEARCH, data: null })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH,
            data: null
        })
    }
}
// export const fetchDetailPlaylist = (pid) => async (dispatch) => {
//     try {
//         const response = await apis.apiGetDetailPlaylist(pid)

//         if (response?.data.err === 0) {
//             dispatch({
//                 type: actionTypes.PLAYLIST,
//                 songs: response.data?.data?.song?.items
//             })
//         }

//         fetchDetailPlaylist()
//     } catch (error) {
//         dispatch({
//             type: actionTypes.PLAYLIST,
//             songs: null
//         })
//     }
// }