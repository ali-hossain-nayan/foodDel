import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'


const Cart = () => {
  const {
    cartItems,
    food_list,
    removeCart,
    getTotalCartAmount,
    baseURL
  } = useContext(StoreContext);
  const navigate = useNavigate()


  const totalAmount = getTotalCartAmount();

  return (
    <div className="mt-32 px-4 lg:px-16">
      <div className="grid grid-cols-6 text-gray-700 text-lg font-medium text-center border-b pb-2">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      <div className="mt-6 space-y-6">
        {food_list.map((item) => {
          const quantity = cartItems[item._id];
          if (quantity > 0) {
            return (
              <div
                key={item._id}
                className="grid grid-cols-6 text-center text-gray-700 text-base md:text-lg items-center border-b pb-4"
              >
                <img
                  src={`${baseURL}/images/${item.image}`}
                  alt={item.name}
                  className="mx-auto w-20 h-20 object-cover rounded-lg"
                />
                <p className="mt-2 font-medium">{item.name}</p>
                <p className="mt-2">${item.price}</p>
                <p className="mt-2">{quantity}</p>
                <p className="mt-2">${(item.price * quantity).toFixed(2)}</p>
                <button
                  className="mt-2 text-[#137548] hover:text-[#79b89a] font-bold"
                  onClick={() => removeCart(item._id)}
                >
                  Remove
                </button>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="flex flex-col md:flex-row mt-32 justify-between gap-6">
        <div className="p-4 bg-gray-50 rounded-md shadow-md flex-1">
          <h1 className="text-[#137548] font-bold text-xl">Cart Totals</h1>
          <div className="mt-4">
            <div className="flex justify-between py-2">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700 font-medium">${totalAmount.toFixed(2)}</p>
            </div>
            <hr />
            <div className="flex justify-between py-2">
              <p className="text-gray-700">Delivery Fee</p>
              <p className="text-gray-700 font-medium">${2}</p>
            </div>
            <hr />
            <div className="flex justify-between py-2 font-bold">
              <p className="text-gray-700">Total</p>
              <p className="text-gray-700">${(totalAmount + 2).toFixed(2)}</p>
            </div>
          </div>
          {/* <Link to="/order"> */}
            <button className="w-full bg-[#137548] mt-4 text-white py-3 rounded-md hover:bg-[#79b89a]"
            onClick={() => navigate('/order')}
            >
              CHECKOUT TO PROCEED
            </button>
          {/* </Link> */}
        </div>

        <div className="p-4 bg-gray-50 rounded-md shadow-md flex-1">
          <p className="text-gray-700">If you have a promo code, enter it here:</p>
          <div className="flex mt-4 gap-2">
            <input
              type="text"
              placeholder="Promo Code"
              className="flex-1 bg-gray-100 border focus:outline-none p-3 rounded-md"
            />
            <button className="text-white bg-[#137548] p-3 rounded-md hover:bg-[#79b89a]">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
