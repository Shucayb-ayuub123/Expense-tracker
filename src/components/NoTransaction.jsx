
import React from 'react'
import { FaFileInvoiceDollar } from "react-icons/fa";
const NoTransaction = () => {
  return (
    <div className='flex justify-center items-center w-full h-full flex-col space-y-20 relative'>
      <FaFileInvoiceDollar className='text-6xl text-gray-400  absolute top-10' />
      <div className='flex-col text-center mb-10 absolute top-35'>
        <h1 className='font-bold text-xl'>No Transaction Found</h1>
        <p className='mt-4 text-gray-500 '>Add some transaction to see report and analysis</p>
      </div>
    </div>
  )
}

export default NoTransaction
