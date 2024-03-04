import React, { useEffect } from 'react'
import { UseSelector, useSelector } from 'react-redux'

const Slider = () => {

    const { banner } = useSelector(state => state.app)
    // di chuyen banner image
    useEffect(() => {
        const sliderEls = document.getElementsByClassName('slider-item')
        let min = 0
        let max = 2
        const intervalId = setInterval(() => {
            for (let i = 0; i < sliderEls.length; i++) {
                if (i <= max && i >= min) {
                    sliderEls[i].style.cssText = `display : none`
                } else {
                    sliderEls[i].style.cssText = `display : block`
                }
            }
            min += 1
            max += 1
            console.log({ min, max })
        }, 1000)
        return () => {
            intervalId && clearInterval(intervalId)
        }
    }, [])

    return (
        <div className='flex gap-4 w-full overflow-hidden px-[59px] pt-8'>
            {banner?.map(item => (
                <img
                    key={item.encodeId}
                    src={item.banner}
                    className='flex-1 object-contain w-1/3 rounded-lg'
                />
            ))}
        </div>
    )
}

export default Slider