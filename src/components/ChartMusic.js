import React, { memo, useState, useEffect, useRef } from 'react'
import bgchart from '../image/bg_chart.jpg'
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { SongItem } from './'
import _ from 'lodash'
import { Link } from 'react-router-dom';
import Path from '../ultis/Path';
import icons from '../ultis/icon';

const { BsPlayFill } = icons

const ChartMusic = () => {

    const [data, setData] = useState(null)
    const { chart, rank } = useSelector(state => state.app)
    const chartRef = useRef()
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    })
    const [tooltipData, setTooltipData] = useState(null)

    // cấu hình biểu đồ chart
    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(255,255,255,0.1)', drawTicks: false },
                min: chart?.minScore,
                max: chart?.maxScore,
                border: { dash: [3, 4] }
            },
            x: {
                ticks: { color: 'white' },
                grid: { color: 'transparent' }
            }
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: (ctx) => {
                    const data = []
                    for (let i = 0; i < 3; i++)//lấy 3 phần tử xếp hạng 
                        data.push({
                            encodeId: Object.keys(chart?.items)[i], // key = encodeId của bài hát đc xếp hạng
                            data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter)
                        })// lấy dữ liệu bài hát - giờ / hết cho 2 truyền vào counter
                    const tooltipModel = (ctx).tooltip
                    setTooltipData(data.find(i => i.data.some(n => n === +tooltipModel.body[0].lines[0].replace(',', '')))?.encodeId)
                    if (tooltipModel.opacity === 0) {
                        if (tooltipState.opacity !== 0) setTooltipState(prev => ({ ...prev, opacity: 0 }))
                        return
                    }
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltipModel.caretX,
                        top: tooltipModel.caretY,
                    }
                    if (!_.isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData)
                }
            }
        },
        hover: {
            mode: 'dataset',
            intersect: false
        }
    }

    // Set #ZINGCHART
    useEffect(() => {
        const labels = chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
        const datasets = []
        if (chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]?.filter(i => +i.hour % 2 === 0)?.map(item => item.counter),
                    borderColor: i === 0 ? 'rgb(74, 144, 226)' : i === 1 ? 'rgb(80, 227, 194)' : 'rgb(227, 80, 80)',
                    tension: 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: 'white',
                    pointHoverRadius: 5,
                    pointBorderColor: i === 0 ? 'rgb(74, 144, 226)' : i === 1 ? 'rgb(80, 227, 194)' : 'rgb(227, 80, 80)',
                    pointHoverColorWidth: 7,

                })
            }
            setData({ labels, datasets })
        }
    }, [chart])

    return (
        <div className='px-[59px] mt-12 relative max-h-[430px]'>
            <img src={bgchart} alt="bg-chart" className='w-full object-cover rounded-md max-h-[430px]' />
            <div className='absolute top-0 z-10 left-[59px] bg-[rgba(77,34,104,0.9)] right-[59px] bottom-0 rounded-md'></div>
            <div className='absolute top-0 z-20 left-[59px] right-[59px] bottom-0 p-5 flex flex-col gap-8'>
                <Link to={Path.ZING_CHART} className='flex gap-2 items-center text-white hover:text-green-400' >
                    <h3 className='text-2xl font-bold'>#zingchart</h3>
                    <span className='rounded-full p-1 bg-white' ><BsPlayFill size={20} color='black' /></span>
                </Link>
                <div className='flex gap-4 h-full'>
                    <div className='flex-4 flex flex-col gap-4'>
                        {rank?.filter((i, index) => index < 3)?.map((item, index) => (
                            <SongItem
                                key={item.encodeId}
                                thumbnail={item.thumbnail}
                                title={item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
                                artists={item.artistsNames}
                                sid={item.encodeId}
                                order={index + 1}
                                percent={Math.round(+item.score * 100 / +chart?.totalScore)}
                                style='text-white bg-[hsla(293,24%,34%,0.7)] hover:bg-[#945EA7]'
                            />
                        ))}
                        <Link to={Path.ZING_CHART} className='text-white px-2 py-1 rounded-l-full rounded-r-full border border-white w-fit m-auto' >Xem Thêm</Link>
                    </div>
                    <div className='flex-6 h-[90%] relative cursor-pointer'>
                        {data && <Line data={data} ref={chartRef} options={options} />}
                        <div
                            className='tooltip' style={{ top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity, position: 'absolute' }}
                        >
                            <SongItem
                                thumbnail={rank?.find(i => i.encodeId === tooltipData)?.thumbnail}
                                title={rank?.find(i => i.encodeId === tooltipData)?.title}
                                artists={rank?.find(i => i.encodeId === tooltipData)?.artistsNames}
                                sid={rank?.find(i => i.encodeId === tooltipData)?.encodeId}
                                style='bg-white'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ChartMusic)