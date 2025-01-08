import React from 'react';
import { getTotalCartAmount, removeFromCart, selectCartItems } from '../../store/cartSlic/foodListSlice';
import { selectFoodList } from '../../store/cartSlic/foodListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const foodList = useSelector(selectFoodList);
  const totalAmount = useSelector(getTotalCartAmount);
  const baseUrl = "http://localhost:4001"

  console.log(totalAmount)
  console.log('Food List:', foodList);
  console.log('Cart Items:', cartItems);

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
        {foodList.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div
                key={item._id}
                className="grid grid-cols-6 text-center text-gray-700 text-base md:text-lg items-center border-b pb-4"
              >
                <img
                  src={baseUrl + "/images/" + item.image}
                  alt={item.name}
                  className="mx-auto w-20 h-20 object-cover rounded-lg"
                />

                <p className="mt-2 font-medium">{item.name}</p>

                <p className="mt-2">${item.price}</p>

                <p className="mt-2">{cartItems[item._id]}</p>

                <p className="mt-2">${item.price * cartItems[item._id]}</p>

                <button
                  className="mt-2 text-[#137548] hover:text-[#79b89a] font-bold"
                  onClick={() => dispatch(removeFromCart({ itemId: item._id }))}
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
          <Link to="/order">
            <button className="w-full bg-[#137548] mt-4 text-white py-3 rounded-md hover:bg-[#79b89a]">
              CHECKOUT TO PROCEED
            </button>
          </Link>
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
