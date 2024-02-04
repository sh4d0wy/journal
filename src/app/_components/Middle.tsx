import React from 'react'

const Middle = ({text}:{text:string}) => {
  return (
    <>
        <div className='w-[70vw] h-[90vh] bg-gray-50 border-8 shadow-2xl border-white relative rounded-2xl'>
            {text}
        </div>
    </>
  )
}

export default Middle