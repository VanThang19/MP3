import React, { memo, useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto'
import bgchart from '../image/bg_chart.jpg'
import { useSelector } from 'react-redux';

const ChartMusic = () => {

    const [data, setData] = useState(null)
    const { chart, rank } = useSelector(state => state.app)

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
            legend: false
        },
        hover: {
            mode: 'dataset',
            intersect: false
        }
    }

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
        <div className='px-[59px] mt-12 relative max-h-[350px]' >
            <img src={bgchart} alt='bg-chart' className='w-full object-cover rounded-md max-h-[350px]' />
            <div className='absolute  top-0 bottom-0 left-[59px] bg-[rgba(77,34,104,0.9)] right-[59px] z-10 ' ></div>
            <div className='absolute top-0 bottom-0 left-[59px] right-[59px] z-20 p-5 flex flex-col '>
                <h3 className='text-2xl text-white font-bold' >#Zingchart</h3>
                <div className='flex gap-4 h-full' >
                    <div className='flex-3 border border-white' >
                        rank
                    </div>
                    <div className='flex-7 h-full ' >
                        {data && <Line data={data} options={options} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ChartMusic)