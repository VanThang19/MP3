import React, { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Player, SidebarLeft, SidebarRight, Header } from '../../components'
import Scrollbars from 'react-custom-scrollbars-2';
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { useSelector } from 'react-redux'



// Outlet - Route : được sử dụng để hiển thị nội dung của các tuyến con trong một tuyến cha
const Public = () => {
    const [isShowRightSidebar, setIsShowRightSidebar] = useState(true)
    const { scrollTop } = useSelector(state => state.app)

    const dispatch = useDispatch()

    const handleScrollTop = (e) => {
        if (e.target.scrollTop === 0) {
            dispatch(actions.zeroScrollTop(true))
        } else {
            dispatch(actions.zeroScrollTop(false))
        }
    }
    return (
        <div className='w-full relative h-screen flex-col bg-main-300' >
            <div className='w-full h-full flex flex-auto'>
                <div className='w-[240px] h-full flex-none' >
                    <SidebarLeft />
                </div>
                <div className='flex-auto flex flex-col' >
                    <div className={`h-[70px] ${scrollTop ? 'bg-transparent' : 'bg-main-300'} fixed right-[329px] left-[240px] top-0 px-[59px] z-50 flex items-center`}>
                        <Header />
                    </div>
                    <div className=' flex-auto w-full' >
                        <Scrollbars
                            onScroll={handleScrollTop}
                            autoHide
                            style={{ width: '100%', height: '100%' }} >
                            <Outlet />
                        </Scrollbars>
                    </div>
                </div>
                {isShowRightSidebar && <div className='w-[329px] hidden 1600:flex h-screen flex-none animate-slide-left' >
                    <SidebarRight />
                </div>}
            </div>

            <div className='fixed bottom-0 left-0 right-0 h-[90px]'>
                <Player setIsShowRightSidebar={setIsShowRightSidebar} />
            </div>
        </div>
    );
};

export default Public;