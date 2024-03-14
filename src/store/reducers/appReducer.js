import actionTypes from "../actions/actionTypes";

//  Tạo giá trị khởi tạo cho Reducer
const initState = {
    banner: [],
    chill: {}
}

// state : biến lưu giá trị của Reducer quản lí 
// action : view gửi lên giao diện chính 
const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                chill: action.homeData?.find(item => item.sectionId === 'hEditorTheme') || {},
            }
        default:
            return state
    }
}
export default appReducer