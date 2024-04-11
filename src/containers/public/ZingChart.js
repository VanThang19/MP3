import React, { useEffect, useState, useRef } from 'react'
import { apiGetChartHome } from '../../apis'
import bg_chart from '../../image/bg_chart.jpg'
import { Line } from 'react-chartjs-2';
import { SongItem, Rankbox } from '../../components';
import _ from 'lodash'
import { Chart } from 'chart.js/auto';


export const ZingChart = () => {
    const [chartData, setChartData] = useState(null)
    const [data, setData] = useState(null)
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
                grid: { color: 'rgba(0,0,0,0.3)', drawTicks: false },
                min: chartData?.RTChart?.chart?.minScore,
                max: chartData?.RTChart?.chart?.maxScore,
                border: { dash: [3, 4] }
            },
            x: {
                ticks: { color: 'black' },
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
                            encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i], // key = encodeId của bài hát đc xếp hạng
                            data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter)
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
    //call data
    useEffect(() => {
        const GetChartData = async () => {
            const res = await apiGetChartHome()
            if (res.data.err === 0) setChartData(res.data.data)
        }
        GetChartData()
    }, [])
    //chart 
    useEffect(() => {
        const labels = chartData?.RTChart?.chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
        const datasets = []
        if (chartData?.RTChart?.chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter(i => +i.hour % 2 === 0)?.map(item => item.counter),
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
    }, [chartData])
    console.log(chartData)

    return (
        <div>
            <div className='flex flex-col'>
                <div className=' relative'>
                    <img src={bg_chart} alt='bg_chart' className='w-full h-[500px] object-cover grayscale' />
                    <div className='absolute top-0 left-0 right-0 bottom-0 bg-[rgba(206,217,217,0.9)]' ></div>
                    <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#e3f3ea] to-transparent' ></div>
                    <div className='absolute top-0 left-0 right-0 bottom-1/2 flex items-center px-[60px]' >
                        <h3 className='font-bold text-[40px] text-green-800' >#ZINGCHART</h3>
                    </div>
                    <div className=' absolute top-1/3 left-0 right-0 bottom-0 px-[60px] '>
                        {data && <Line data={data} ref={chartRef} options={options} />}
                        <div
                            className='tooltip' style={{ top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity, position: 'absolute' }}
                        >
                            <SongItem
                                thumbnail={chartData?.RTChart?.items?.find(i => i.encodeId === tooltipData)?.thumbnail}
                                title={chartData?.RTChart?.items?.find(i => i.encodeId === tooltipData)?.title}
                                artists={chartData?.RTChart?.items?.find(i => i.encodeId === tooltipData)?.artistsNames}
                                sid={chartData?.RTChart?.items?.find(i => i.encodeId === tooltipData)?.encodeId}
                                style='bg-white'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-[60px] mt-4'>
                <Rankbox data={chartData?.RTChart?.items} number={10} />
            </div>
            <div className='relative' >
                <img src={bg_chart} alt='bg_chart' className='w-full h-[650px] object-cover grayscale' />
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-[rgba(206,217,217,0.9)]' ></div>
                <div className='absolute top-0 left-0 right-0 bottom-1/2 flex flex-col gap-4 mt-4 px-[60px]' >
                    <h3 className='font-bold text-[40px] text-green-800' > # Bảng Xếp Hạng Tuần </h3>
                    <div className='flex gap-4 h-fit ' >
                        {chartData?.weekChart && Object.entries(chartData?.weekChart)?.map((item, index) => (
                            <div className='flex-1 bg-gray-300 rounded-md px-[10px] py-3' key={index} >
                                <h3 className='text-[24px] text-green-800 font-bold' >{item[0] === 'vn' ? 'Việt Nam' : item[0] === 'us' ? 'US-UK' : item[0] === 'korea' ? 'K-Pop' : ''}</h3>
                                <div className='h-full mt-4' >
                                    <Rankbox
                                        data={item[1]?.items}
                                        number={5}
                                        isHideAlbum={true}
                                        link={item[1]?.link}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='w-full h-[200px]'></div>
        </div>

    )
}
export default ZingChart    