import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, baseURL } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let orderItems = food_list.reduce((acc, item) => {
      if (cartItems[item._id] > 0) {
        acc.push({ ...item, quantity: cartItems[item._id] });
      }
      return acc;
    }, []);

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    };

    const callAPI = await axios.post(baseURL + '/api/order/place', orderData, { headers: { token } });

    if (callAPI.data.success) {
      window.location.replace(callAPI.data.session_url);
    } else {
      alert('Something went wrong!!');
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 2;
  const total = getTotalCartAmount() + deliveryFee;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row justify-between mt-20 px-4 md:px-16 gap-8">
      <div className="w-full lg:w-1/2 bg-gray-50 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-[#137548] mb-6">Delivery Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" name="firstName" value={data.firstName} onChange={onChangeHandler} placeholder="First name" required className="border-2 p-3 rounded-lg w-full" />
          <input type="text" name="lastName" value={data.lastName} onChange={onChangeHandler} placeholder="Last name" required className="border-2 p-3 rounded-lg w-full" />
        </div>

        <input type="email" name="email" value={data.email} onChange={onChangeHandler} placeholder="Email address" required className="border-2 p-3 rounded-lg w-full mb-4" />

        <input type="text" name="street" value={data.street} onChange={onChangeHandler} placeholder="Street" required className="border-2 p-3 rounded-lg w-full mb-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" name="city" value={data.city} onChange={onChangeHandler} placeholder="City" required className="border-2 p-3 rounded-lg w-full" />
          <input type="text" name="state" value={data.state} onChange={onChangeHandler} placeholder="State" required className="border-2 p-3 rounded-lg w-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" name="zipcode" value={data.zipcode} onChange={onChangeHandler} placeholder="Zip code" required className="border-2 p-3 rounded-lg w-full" />
          <input type="text" name="country" value={data.country} onChange={onChangeHandler} placeholder="Country" required className="border-2 p-3 rounded-lg w-full" />
        </div>

        <input type="text" name="phone" value={data.phone} onChange={onChangeHandler} placeholder="Phone" required className="border-2 p-3 rounded-lg w-full" />
      </div>

      <div className="w-full lg:w-1/2 p-6 bg-gray-50 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-[#137548] mb-4">Cart Totals</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${getTotalCartAmount().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>${deliveryFee}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button type="submit" className="w-full bg-[#137548] text-white mt-6 py-3 rounded-lg hover:bg-[#0e5e3f] transition">
          PROCEED TO PAYMENT
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
