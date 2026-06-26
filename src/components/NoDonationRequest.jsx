import React from 'react'
import { MdBloodtype, MdOutlineBloodtype } from 'react-icons/md'

const NoDonationRequest = () => {
  return (
    <div className='mt-10 flex flex-col justify-center items-center border bg-red-50 max-w-4xl py-15 rounded-xl mx-auto'>
        <p className='text-6xl text-red-400'><MdBloodtype /></p>
        <p className='text-2xl font-bold mt-2 text-gray-400'>No Recent Request</p>
    </div>
  )
}

export default NoDonationRequest