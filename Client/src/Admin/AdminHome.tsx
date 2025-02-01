import React from 'react'
import AdminNavbar from './AdminCompoenents/AdminNavbar'
import Sidebar from './AdminCompoenents/Sidebar'
const AdminHome = () => {
  return (
    <div>
       <div className='bg-gray-50 min-h-screen'>
      <>
      <AdminNavbar/>
      <hr />
      <div className="flex w-full"><Sidebar/></div>
      </>
      
    </div>
    </div>
  )
}

export default AdminHome
