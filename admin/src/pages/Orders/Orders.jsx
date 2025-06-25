import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = () => {
  const baseURL = 'http://localhost:4001'

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/order/list`);
      console.log(res.data);
      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const res = await axios.post(`${baseURL}/api/order/status`, {
        orderId,
        status: e.target.value,
      });
      if (res.data.success) {
        fetchAllOrders();
      }
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="mt-32 px-4 lg:px-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Orders</h2>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6 items-center"
          >
            <img
              src={assets.parcel_icon}
              alt="parcel"
              className="w-16 h-16 object-contain"
            />

            <div className="flex-1 w-full">
              <p className="font-semibold text-gray-700 mb-1">
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx < order.items.length - 1 && ', '}
                  </span>
                ))}
              </p>

              <p className="text-gray-600 font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>

              <div className="text-sm text-gray-500 mt-1">
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
                </p>
              </div>

              <p className="text-gray-600 mt-1">📞 {order.address.phone}</p>
            </div>

            <div className="text-center min-w-[120px]">
              <p className="text-sm text-gray-600 mb-1">Items: {order.items.length}</p>
              <p className="text-md font-semibold text-green-600 mb-2">${order.amount}</p>

              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
