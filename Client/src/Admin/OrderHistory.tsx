import React, { useState } from "react";

interface Order {
  id: number;
  name: string;
  payment: string;
  timeRemaining: string;
  type: string;
  status: string;
  total: string;
}

const orders: Order[] = [
  {
    id: 2632,
    name: "Brooklyn Zoe",
    payment: "Cash",
    timeRemaining: "13 min",
    type: "Delivery",
    status: "Delivered",
    total: "£12.00",
  },
  {
    id: 2633,
    name: "Alice Krejčová",
    payment: "Paid",
    timeRemaining: "49 min",
    type: "Collection",
    status: "Collected",
    total: "£14.00",
  },
  {
    id: 2634,
    name: "Jurriaan van",
    payment: "Cash",
    timeRemaining: "07 min",
    type: "Delivery",
    status: "Cancelled",
    total: "£18.00",
  },
  {
    id: 2635,
    name: "Ya Chin-Ho",
    payment: "Cash",
    timeRemaining: "49 min",
    type: "Collection",
    status: "Collected",
    total: "£26.00",
  },
  {
    id: 2636,
    name: "Shaamikh Al",
    payment: "Cash",
    timeRemaining: "13 min",
    type: "Delivery",
    status: "Delivered",
    total: "£08.00",
  },
  {
    id: 2637,
    name: "Niek Bove",
    payment: "Paid",
    timeRemaining: "00 min",
    type: "Collection",
    status: "Cancelled",
    total: "£15.00",
  },
  {
    id: 2638,
    name: "Urewa Himona",
    payment: "Cash",
    timeRemaining: "15 min",
    type: "Delivery",
    status: "Delivered",
    total: "£19.00",
  },
];

const OrderHistory: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunc: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFunc(event.target.value);
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
          <button className="bg-gray-300 py-2 px-4 rounded-md">
            Completed
          </button>
          <button className="bg-gray-300 py-2 px-4 rounded-md">
            Cancelled
          </button>
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
            <th className="border border-gray-300 p-2">Payment</th>
            <th className="border border-gray-300 p-2">Time Remaining</th>
            <th className="border border-gray-300 p-2">Type</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Total</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{order.id}</td>
              <td className="border border-gray-300 p-2">{order.name}</td>
              <td className="border border-gray-300 p-2">{order.payment}</td>
              <td className="border border-gray-300 p-2">
                {order.timeRemaining}
              </td>
              <td className="border border-gray-300 p-2">{order.type}</td>
              <td className="border border-gray-300 p-2">{order.status}</td>
              <td className="border border-gray-300 p-2">{order.total}</td>
              <td className="border border-gray-300 p-2">
                <div className="relative inline-block text-left">
                  <button
                    className="bg-gray-200 p-1 rounded-md"
                    onClick={() =>
                      setOpenMenuId(openMenuId === order.id ? null : order.id)
                    }
                  >
                    ...
                  </button>

                  {openMenuId === order.id && (
                    <div className="absolute right-[-100px] z-10 mt-2 w-32   origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
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
          ))}
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
