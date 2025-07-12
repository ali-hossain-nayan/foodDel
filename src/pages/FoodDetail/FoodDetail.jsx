import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import toast from 'react-hot-toast';

const FoodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { food_list, baseURL, addToCart, removeCart, cartItems } = useContext(StoreContext);

  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    const food = food_list.find(item => item._id === id);
    setSelectedFood(food);
  }, [id, food_list]);

  if (!selectedFood) return <p className="p-10 text-red-600">Food item not found</p>;

  const itemCount = cartItems[selectedFood._id] || 0;
  const popularItems = food_list.filter(item => item._id !== selectedFood._id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(selectedFood._id);
    toast.success(`${selectedFood.name} added to cart`);
  };

  const handleRemoveFromCart = () => {
    removeCart(selectedFood._id);
    toast.success(`${selectedFood.name} removed from cart`);
  };

  const switchToFood = (newFoodId) => {
    navigate(`/food/${newFoodId}`);
  };

  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto">
      {/* Food Detail Section */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <img
          src={`${baseURL}/images/${selectedFood.image}`}
          alt={selectedFood.name}
          className="w-full md:w-[50%] rounded-xl object-cover shadow-md"
        />

        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedFood.name}</h2>

          {/* Ratings and Offer */}
          <div className="flex gap-4 items-center mb-4">
            <span className="text-yellow-500 font-semibold">⭐ 4.5</span>
            <span className="bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded">
              25% OFF
            </span>
          </div>

          <p className="text-gray-600 text-lg">{selectedFood.description}</p>

          <p className="text-2xl font-semibold text-green-700 mt-4">
            ${selectedFood.price.toFixed(2)}
          </p>

          {/* Add/Remove Controls */}
          {itemCount === 0 ? (
            <button
              onClick={handleAddToCart}
              className="mt-6 px-6 py-2 bg-[#137548] hover:bg-[#0e5e3f] text-white font-semibold rounded-lg transition"
            >
              Add to Cart
            </button>
          ) : (
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={handleRemoveFromCart}
                className="text-red-600 text-2xl px-3 rounded-full border border-red-600 hover:bg-red-50"
              >
                −
              </button>
              <span className="text-lg font-semibold">{itemCount}</span>
              <button
                onClick={handleAddToCart}
                className="text-green-600 text-2xl px-3 rounded-full border border-green-600 hover:bg-green-50"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Popular Items */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Popular Items</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {popularItems.map(item => {
            const count = cartItems[item._id] || 0;

            const handleAddPopular = (e) => {
              e.stopPropagation();
              addToCart(item._id);
              toast.success(`${item.name} added to cart`);
            };

            const handleRemovePopular = (e) => {
              e.stopPropagation();
              removeCart(item._id);
              toast.success(`${item.name} removed from cart`);
            };

            return (
              <div
                key={item._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => switchToFood(item._id)}
              >
                <img
                  src={`${baseURL}/images/${item.image}`}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h4 className="mt-2 font-semibold text-gray-800">{item.name}</h4>
                <p className="text-green-600 font-bold">${item.price.toFixed(2)}</p>

                {count === 0 ? (
                  <button
                    onClick={handleAddPopular}
                    className="mt-2 text-sm bg-[#137548] text-white px-3 py-1 rounded hover:bg-[#0e5e3f]"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="mt-2 flex items-center gap-4">
                    <button
                      onClick={handleRemovePopular}
                      className="text-red-600 text-xl px-3 rounded-full border border-red-600 hover:bg-red-50"
                    >
                      −
                    </button>
                    <span className="text-sm">{count}</span>
                    <button
                      onClick={handleAddPopular}
                      className="text-green-600 text-xl px-3 rounded-full border border-green-600 hover:bg-green-50"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
