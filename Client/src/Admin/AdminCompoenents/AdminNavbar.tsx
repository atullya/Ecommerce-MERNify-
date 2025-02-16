import { BASE_URL } from "@/App";
import logo from "../../assets/ll.png";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/auth/logout`);
      if (res.data) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img src={logo} alt="" className="w-[max(10%,80px)] h-18 " />
      <button
        className="bg-gray-600 text-white px-6 py-2 ml-[900px] sm:px-7 rounded-full"
        onClick={() => {
          logoutUser();
        }}
      >
        Logout
      </button>
      <ToastContainer />
    </div>
  );
};

export default AdminNavbar;
