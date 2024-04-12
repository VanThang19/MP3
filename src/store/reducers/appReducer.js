import actionTypes from "../actions/actionTypes";

//  Tạo giá trị khởi tạo cho Reducer
const initState = {
    banner: [],
    chill: {},
    RemixMusic: {},
    MoodMusic: {},
    Top100: {},
    Album_Hot: {},
    newRelease: {},
    weekChart: [],
    chart: {},
    rank: [],
    scrollTop: true,
    currentWidth: null

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
                RemixMusic: action.homeData?.find(item => item.sectionId === 'hEditorTheme3') || {},
                MoodMusic: action.homeData?.find(item => item.sectionId === 'hEditorTheme4') || {},
                Top100: action.homeData?.find(item => item.sectionId === 'h100') || {},
                Album_Hot: action.homeData?.find(item => item.sectionId === 'hAlbum') || {},
                newRelease: action.homeData?.find(item => item.sectionType === 'new-release') || {},
                weekChart: action.homeData?.find(item => item.sectionType === 'weekChart')?.items || [],
                chart: action.homeData?.find(item => item.sectionId === 'hZC')?.chart || {},
                rank: action.homeData?.find(item => item.sectionId === 'hZC')?.items || [],
            }
        case actionTypes.ZERO_SCROLTOP:
            return {
                ...state,
                scrollTop: action.flag
            }
        case actionTypes.CURRENT_WIDTH:
            return {
                ...state,
                scrollTop: action.w
            }
        default:
            return state
    }
}
export default appReducer