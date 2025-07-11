import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import toast from 'react-hot-toast';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeCart, baseURL } = useContext(StoreContext);

  const itemCount = cartItems[id] || 0;

  const handleAdd = () => {
    addToCart(id);
    toast.success(`${name} added to cart`);
  };

  const handleRemove = () => {
    removeCart(id);
    toast.success(`${name} removed from cart`);
  };

  return (
    <div className="w-60 sm:w-80 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center mt-10">
      {/* Image */}
      <div className="w-full h-48 mb-4">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={`${baseURL}/images/${image}`}
          alt={name}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mb-4">
        {itemCount === 0 ? (
          <button onClick={handleAdd}>
            <img src={assets.add_icon_white} alt="Add" className="w-8 h-8" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={handleRemove}>
              <img src={assets.remove_icon_red} alt="Remove" className="w-6 h-6" />
            </button>
            <span className="text-md font-medium">{itemCount}</span>
            <button onClick={handleAdd}>
              <img src={assets.add_icon_green} alt="Add" className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
        <p className="text-lg font-semibold text-green-600 mt-3">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default FoodItem;
