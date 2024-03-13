import actionTypes from "../actions/actionTypes";

//  Tạo giá trị khởi tạo cho Reducer
const initState = {
    curSongId: null,
    isPlaying: false,
    atAlbum: false,
    songs: null
}

// state : biến lưu giá trị của Reducer quản lí 
// action : view gửi lên giao diện chính 

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.sid || null
            }
        case actionTypes.PLAY:
            return {
                ...state,
                isPlaying: action.flag
            }
        case actionTypes.SET_ALBUM:
            return {
                ...state,
                atAlbum: action.flag
            }
        case actionTypes.PLAYLIST:
            return {
                ...state,
                songs: action.songs || null
            }

        default:
            return state
    }
}
export default musicReducer