import React, { useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import bg_chart from '../../image/bg_chart.jpg'

const notActiveStyle = 'text-[24px] text-green-800 py-[10px] font-semibold'
const ActiveStyle = 'text-[24px] text-green-900 py-[10px] font-semibold border-b-2 border-[#0E8080]'
const WeekRank = ({ weekChart }) => {

    const { pid } = useParams()

    useEffect(() => {
        // console.log(pid)
    }, [pid])


    return (
        <div>
            <div className='relative' >
                <img src={bg_chart} alt='bg_chart' className='w-full h-[500px] object-cover grayscale' />
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-[rgba(206,217,217,0.8)]' ></div>
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#e3f3ea] to-transparent' ></div>
                <div className='absolute top-0 left-0 right-0 bottom-1/2 flex px-[60px] flex-col gap-4' >
                    <h3 className='font-bold text-[40px] text-green-800 mt-[90px] '># Bảng Xếp Hạng Tuần</h3>
                    <div className='flex gap-8 ' >
                        {weekChart?.map(item => (
                            <NavLink to={item.link.split('.')[0]} className={({ isActive }) => isActive ? ActiveStyle : notActiveStyle}>
                                {item.country === 'vn' ? 'VIỆT NAM' : item.country === 'us' ? 'US-UK' : item.country === 'korea' ? 'K-POP' : ''}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeekRank