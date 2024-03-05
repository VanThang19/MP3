import actionTypes from "../actions/actionTypes";

//  Tạo giá trị khởi tạo cho Reducer
const initState = {
    curSongId: null
}

// state : biến lưu giá trị của Reducer quản lí 
// action : view gửi lên giao diện chính 

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.payload || null
            }

        default:
            return state
    }
}
export default musicReducer