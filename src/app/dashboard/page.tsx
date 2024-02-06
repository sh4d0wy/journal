import React from 'react'
import Middle from '../_components/Middle';
import Image from 'next/image';

const page = () => {
  return (
    <div className="relative h-[90vh] w-[70vw] rounded-2xl py-10 px-10 border-8 border-white bg-gray-50 shadow-2xl">
        <div className='flex gap-10 mb-10'>
          <div className='box bg-white rounded-2xl w-[20vw] h-[20vh] shadow-lg flex justify-center items-center '>
                <div className='text-bold text-xl font-bold'>Level 1</div>
          </div>
          <div className='box bg-white rounded-2xl w-[20vw] h-[20vh] shadow-lg flex justify-center items-center '>
                <div className='text-bold text-xl font-bold'>Total Points</div>
          </div>
        </div>
        <div className='box bg-white rounded-2xl w-[45vw] h-[50vh] shadow-xl flex justify-center items-center '>
            <div>Chart</div>
        </div>
    </div>
  )
}

export default page;