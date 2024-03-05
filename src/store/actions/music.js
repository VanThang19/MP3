import actionTypes from "./actionTypes";


export const setCurSongId = (sid) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    payload: sid
})