import icons from "./icon"

const { MdOutlineLibraryMusic, IoSearchCircleOutline, LiaChartLineSolid, AiTwotoneFileText, BsChatDots } = icons
export const sidebarMenu = [
    {
        Path: 'mymusic',
        text: 'Cá nhân',
        icons: <MdOutlineLibraryMusic size={24} />
    },
    {
        Path: '',
        text: 'Khám Phá',
        end: true,
        icons: <IoSearchCircleOutline size={28} />
    },
    {
        Path: 'zingchart',
        text: '#zingchart',
        icons: <LiaChartLineSolid size={24} />
    },
    {
        Path: 'follow',
        text: 'Theo dõi',
        icons: <AiTwotoneFileText size={23} />
    },
    {
        Path: 'chat',
        text: 'Nhắn tin',
        icons: <BsChatDots size={22} />
    },
]
export const searchMenu = [
    {
        Path: 'tat-ca',
        text: 'TẤT CẢ',
    },
    {
        Path: 'bai-hat',
        text: 'BÀI HÁT',
        end: true,
    },
    {
        Path: 'playlist',
        text: 'PLAYLIST/ALBUM',
    }
]