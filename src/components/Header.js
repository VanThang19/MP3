import React from 'react'
import icons from '../ultis/icon'
import Search from './Search'

const { PiArrowLeftThin, PiArrowRightThin } = icons

const Header = () => {
  return (
    <div className='flex justify-between w-full'>
      <div className='flex gap-6 w-full items-center'>
        <div className='flex gap-6 text-gray-700'>
          <span> < PiArrowLeftThin style={26} /> </span>
          <span> <PiArrowRightThin style={26} /> </span>
        </div>
        <div className='w-2/3'>
          <Search />
        </div>
      </div>
      <div>
        dang nhap
      </div>
    </div>
  )
}

export default Header