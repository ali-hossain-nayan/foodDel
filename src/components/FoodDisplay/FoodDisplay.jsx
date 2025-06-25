import React, { useContext } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../context/StoreContext';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div id="food-display" className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(food_list) &&
          food_list
            .filter((item) => category === 'All' || item.category === category)
            .map((item) => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
