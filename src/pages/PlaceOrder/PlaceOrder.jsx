import React from 'react'
import { useSelector } from 'react-redux'
import { getTotalCartAmount } from '../../store/cartSlic/foodListSlice'
import { Link } from 'react-router-dom';

const PlaceOrder = () => {
  const totalAmount = useSelector(getTotalCartAmount);

  return (
    <div className='flex justify-between mt-32   '>

      <div className="rounded-xl w-full md:w-1/2 p-6 bg-gray-50 shadow-lg">
        <h1 className="font-bold text-[#137548] text-xl mb-6">Delivery Information</h1>
        <form className="space-y-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="border-2  p-3 rounded-lg focus:outline-none focus:border-[#9ecdb7]  focus:ring-[#137548]"
              type="text"
              placeholder="First name"
              required
            />
            <input
              className="border-2 p-3 rounded-lg focus:outline-none focus:border-[#9ecdb7]  focus:ring-[#137548]"
              type="text"
              placeholder="Last name"
              required
            />
          </div>

          <input
            className="border-2 w-full p-3 rounded-lg focus:outline-none focus:border-[#9ecdb7]  focus:ring-[#137548]"
            type="email"
            placeholder="Email address"
            required
          />

          <input
            className="border-2 w-full p-3 rounded-lg focus:outline-none focus:border-[#9ecdb7]  focus:ring-[#137548]"
            type="text"
            placeholder="Street"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="border-2 p-3 rounded-lg focus:outline-none focus:border-[#9ecdb7]  focus:ring-[#137548]"
              type="text"
              placeholder="City"
              required
            />
            <input
              className="border-2 p-3 rounded-lg focus:outline-none focus:border-[#9ecdb7]  focus:ring-[#137548]"
              type="text"
              placeholder="State"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="border-2 p-3 rounded-lg focus:outline-none focus:border-[#9ecdb7]  focus:ring-[#137548]"
              type="text"
              placeholder="Zip code"
              required
            />
            <input
              className="border-2 p-3 rounded-lg focus:outline-none focus:border-[#9ecdb7]  focus:ring-[#137548]"
              type="text"
              placeholder="Country"
              required
            />
          </div>

          <input
            className="border-2 w-full p-3 rounded-lg focus:outline-none focus:border-[#9ecdb7]  focus:ring-[#137548]"
            type="text"
            placeholder="Phone"
            required
          />
        </form>
      </div>



      <div className="p-4 ml-8 bg-gray-50 rounded-md shadow-md flex-1 mr-">
        <h1 className="text-[#137548] font-bold text-xl">Cart Totals</h1>
        <div className="mt-4">
          <div className="flex justify-between py-2">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700 font-medium">${totalAmount}</p>
          </div>
          <hr />
          <div className="flex justify-between py-2">
            <p className="text-gray-700">Delivery Fee</p>
            <p className="text-gray-700 font-medium">${2}</p>
          </div>
          <hr />
          <div className="flex justify-between py-2 font-bold">
            <p className="text-gray-700">Total</p>
            <p className="text-gray-700">${totalAmount + 2}</p>
          </div>
        </div>
        {/* <Link to="/order"> */}
        <button className="w-full bg-[#137548] mt-4 text-white py-3 rounded-md hover:bg-[#79b89a]">
          PROCEED TO PAYMENT
        </button>
        {/* </Link> */}
      </div>
    </div>
  )
}

export default PlaceOrder