import icons from "./icon"

const { MdOutlineLibraryMusic, IoSearchCircleOutline, LiaChartLineSolid, AiTwotoneFileText } = icons
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
        icons: <IoSearchCircleOutline size={26} />
    },
    {
        Path: 'zing-chart',
        text: '#zingchart',
        icons: <LiaChartLineSolid size={24} />
    },
    {
        Path: 'follow',
        text: 'Theo dõi',
        icons: <AiTwotoneFileText size={23} />
    },
]