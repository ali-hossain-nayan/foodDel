import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = () => {
  // ✅ Automatically use correct base URL depending on environment
  const API_BASE = "https://khaidai-com-backend.onrender.com";
    // process.env.NODE_ENV === 'development'
    //   ? 'http://localhost:4001'
    //   : 'https://khadai-com-admin.onrender.com';

  const [orders, setOrders] = useState([]);

  // ✅ Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/order/list`);
      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error('Something went wrong!!');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to fetch orders');
    }
  };

  // ✅ Handle status change
  const statusHandler = async (e, orderId) => {
    try {
      const res = await axios.post(`${API_BASE}/api/order/status`, {
        orderId,
        status: e.target.value,
      });
      if (res.data.success) {
        fetchAllOrders(); // Refresh updated orders
        toast.success('Status updated');
      } else {
        toast.error('Update failed');
      }
    } catch (err) {
      console.error('Update error:', err);
      toast.error('Status update failed');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="mt-32 px-4 lg:px-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
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
                    {order.address.city}, {order.address.state}, {order.address.country} -{' '}
                    {order.address.zipcode}
                  </p>
                </div>

                <p className="text-gray-600 mt-1">📞 {order.address.phone}</p>
              </div>

              <div className="text-center min-w-[120px]">
                <p className="text-sm text-gray-600 mb-1">Items: {order.items.length}</p>
                <p className="text-md font-semibold text-green-600 mb-2">
                  ${order.amount}
                </p>

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
      )}
    </div>
  );
};

export default Orders;
