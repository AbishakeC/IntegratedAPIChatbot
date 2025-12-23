import React from 'react'
import img1 from '../assets/pullovergirl.jpg'

const Profile = () => {
  return (
    <div className='w-full h-screen'>
        <div className='flex flex-row justify-center align-middle items-center gap-x-6 gap-2'>
            <img className='size-[40vh] rounded-full '  src={img1}/>

            <div className='flex flex-col justify-start align-middle gap-2'>
                <h1 className='text-6xl font-sans text-green-500'>Profile Name</h1>
                <h3 className='text-3xl font-sans text-green-500'>xyz@gmail.com</h3>
            </div>
        </div>

        <div>
                <h1 className='text-2xl font-sans text-green-500'>History</h1>
                <h2>Logout</h2>
            </div>

    </div>
  )
}

export default Profile