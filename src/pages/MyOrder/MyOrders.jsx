import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { baseURL, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${baseURL}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setData(res.data.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen px-4 md:px-10 py-12"
      
    >
      <div className="bg-white/80 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-lg max-w-7xl mx-auto"
      
      style={{ backgroundImage: `url(${assets.orderPic})` }}>
        <h2 className="text-3xl font-bold text-center text-[#137548] mb-10">
          My Orders
        </h2>

        {loading ? (
          <div className="text-center text-gray-500">Loading orders...</div>
        ) : data.length === 0 ? (
          <div className="text-center text-gray-500">You haven’t placed any orders yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((order, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 flex flex-col justify-between"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img src={assets.parcel_icon} alt="Parcel" className="w-12 h-12" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      {order.items.map((item, i) => (
                        <span key={i}>
                          {item.name} x {item.quantity}
                          {i !== order.items.length - 1 && ', '}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t pt-4 text-sm text-gray-600">
                  <p className="font-semibold text-black">
                    Total: <span className="text-green-600">${order.amount}.00</span>
                  </p>
                  <p>Items: {order.items.length}</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center text-sm">
                    <span
                      className={`w-3 h-3 rounded-full mr-2 ${
                        order.status === 'Delivered'
                          ? 'bg-green-500'
                          : 'bg-yellow-400 animate-pulse'
                      }`}
                    ></span>
                    <span className="capitalize font-medium">{order.status}</span>
                  </div>
                  <button
                    onClick={fetchOrders}
                    className="text-sm bg-[#137548] hover:bg-[#0f5f3d] text-white px-4 py-2 rounded-lg transition"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
