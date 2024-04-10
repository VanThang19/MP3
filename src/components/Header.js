import React from 'react'
import icons from '../ultis/icon'
import Search from './Search'
import { useNavigate, useParams } from 'react-router-dom'

const { PiArrowLeftThin, PiArrowRightThin } = icons

const Header = () => {
  const navigate = useNavigate()
  const { singer } = useParams()

  return (
    <div className='flex justify-between w-full'>
      <div className='flex gap-6 w-full items-center'>
        <div className='flex gap-6 cursor-pointer'>
          <span onClick={() => navigate(-1)} > < PiArrowLeftThin style={26} color={singer ? 'gray' : 'black'} /> </span>
          <span onClick={() => navigate(1)} > <PiArrowRightThin style={26} color={singer ? 'gray' : 'black'} /> </span>
        </div>
        <div className='w-2/3'>
          <Search />
        </div>
      </div>
      <div>
        Login
      </div>
    </div>
  )
}

export default Header