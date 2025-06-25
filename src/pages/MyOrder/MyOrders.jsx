import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { baseURL, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        `${baseURL}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setData(res.data.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="px-4 md:px-12 lg:px-20 py-12 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">My Orders</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No orders found.</p>
        ) : (
          data.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-4 border hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-4">
                <img src={assets.parcel_icon} alt="parcel" className="w-12 h-12" />
                <p className="text-gray-700 text-sm flex-1">
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.name} x {item.quantity}
                      {i !== order.items.length - 1 && ', '}
                    </span>
                  ))}
                </p>
              </div>

              <div className="text-sm text-gray-600 flex justify-between items-center border-t pt-4">
                <p className="font-semibold">Total: ${order.amount}.00</p>
                <p>Items: {order.items.length}</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="flex items-center text-sm text-gray-600">
                  <span
                    className={`text-sm mr-2 ${
                      order.status === 'Delivered' ? 'text-green-500' : 'text-yellow-500'
                    }`}
                  >
                    ●
                  </span>
                  <b className="capitalize">{order.status}</b>
                </p>
                <button
                  onClick={fetchOrders}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#137548] rounded-lg hover:bg-[#79b89a] transition-colors"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
