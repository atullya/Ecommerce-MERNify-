import logo from "../../assets/ll.png";
import React from "react";

const AdminNavbar = () => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img src={logo} alt="" className="w-[max(10%,80px)] h-18 " />
      <button className="bg-gray-600 text-white px-6 py-2 sm:px-7 rounded-full">
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
