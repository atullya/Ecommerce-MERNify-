import { assets } from '@/assets/frontend_assets/assets'
import React from 'react'

const AdminNavbar = () => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img src={assets.logo} alt="" className='w-[max(10%,80px)] '/>
      <button className='bg-gray-600 text-white px-6 py-2 sm:px-7 rounded-full'>Logout</button>
    </div>
  )
}

export default AdminNavbar
