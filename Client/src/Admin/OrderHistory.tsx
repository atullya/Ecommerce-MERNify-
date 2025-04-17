import axios from "axios";
import React, { useEffect, useState } from "react";

interface Order {
  _id: string;
  userId: {
    _id: string;
    username: string;
    email: string;
  };
  createdAt: string;
  status: string;
  amount: number;
}

const OrderHistory: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<Order[]>([]);

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunc: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFunc(event.target.value);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/seeProductPlaced"
      );
      const data = response.data;
      setOrderDetails(data);
      console.log("Fetched orders:", data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Order History</h2>
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
            All Orders
          </button>
          <button className="bg-gray-300 py-2 px-4 rounded-md">Summary</button>
          <button className="bg-gray-300 py-2 px-4 rounded-md">Completed</button>
          <button className="bg-gray-300 py-2 px-4 rounded-md">Cancelled</button>
        </div>
        <div className="flex space-x-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange(e, setStartDate)}
            className="p-2 border rounded-md"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleDateChange(e, setEndDate)}
            className="p-2 border rounded-md"
          />
        </div>
      </div>

      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Id</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Payment-Type</th>
            <th className="border border-gray-300 p-2">Ordered-Date</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Total</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.length > 0 ? (
            orderDetails.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{order.userId._id}</td>
                <td className="border border-gray-300 p-2">{order.userId.username}</td>
                <td className="border border-gray-300 p-2">{order.userId.email}</td>
                <td className="border border-gray-300 p-2">E-sewa</td>
                <td className="border border-gray-300 p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">{order.status}</td>
                <td className="border border-gray-300 p-2">{order.amount}</td>
                <td className="border border-gray-300 p-2">
                  <div className="relative inline-block text-left">
                    <button
                      className="bg-gray-200 p-1 rounded-md"
                      onClick={() =>
                        setOpenMenuId(openMenuId === order._id ? null : order._id)
                      }
                    >
                      ...
                    </button>

                    {openMenuId === order._id && (
                      <div className="absolute right-[-100px] z-10 mt-2 w-32 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
                        <div className="py-1">
                          <button className="block px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-100">
                            Refund
                          </button>
                          <button className="block px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-100">
                            Cancel
                          </button>
                          <button className="block px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-gray-100">
                            Message
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center p-4" colSpan={8}>
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex items-center mt-4">
        <label className="mr-2">Busy Mode</label>
        <input type="checkbox" className="toggle" />
      </div>
    </div>
  );
};

export default OrderHistory;
