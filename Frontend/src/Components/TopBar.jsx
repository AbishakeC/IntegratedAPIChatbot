import React from 'react'
import img1 from '../assets/pullovergirl.jpg';
import { useNavigate } from 'react-router-dom';
const TopBar = () => {

  const Navigate = useNavigate();
  return (
    <div>
      <div className='bg-black w-screen h-fit -ml-3  px-10 flex flex-row justify-between align-middle items-center   rounded-lg '>

        <div className='flex flex-row gap-x-4  justify-center align-middle items-center' >
          <img src={img1} className='rounded-full size-10' />
          <h1 className='text-xl font-semibold text-white'>Search Space</h1>
        </div>

        {/* <button className='text-green-700 bg-white shadow-md rounded-md p-2 '> Get Premium</button> */}
          <div className='flex flex-row justify-start align-middle content-center p-2 ml-1 scale-75 bg-white hover:shadow-lg hover:shadow-green-500/30 w-fit rounded-full' onClick={()=>Navigate("/Profile")}> 
              <h1 className='font-extrabold text-2xl text-black align-middle mt-4 mx-3'>
                Profile
              </h1>
                            <span className='bg-gray-900 px-8 p-6 rounded-full text-white'>A</span>

            </div>
      </div>
    </div>
  )
}

export default TopBar