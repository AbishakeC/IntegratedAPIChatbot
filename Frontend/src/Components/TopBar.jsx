import React from 'react'
import img1 from '../assets/pullovergirl.jpg';
import { useNavigate } from 'react-router-dom';
const TopBar = () => {

  const navi = useNavigate();
  return (
    <div>
      <div className='bg-black/30 w-screen h-fit p-4 px-10 flex flex-row justify-between align-middle items-center scale-y-95 '>

        <div className='flex flex-row gap-x-4  justify-center align-middle items-center' >
          <img src={img1} className='rounded-full size-10' />
          <h1 className='text-xl font-sans text-green-600'>Search Space</h1>
        </div>

        <button className='text-green-700 bg-white shadow-md rounded-md p-2 '> Get Premium</button>
      </div>
    </div>
  )
}

export default TopBar