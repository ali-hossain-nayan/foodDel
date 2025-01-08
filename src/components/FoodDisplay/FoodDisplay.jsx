import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFoodList, fetchFoodList } from '../../store/cartSlic/foodListSlice';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const dispatch = useDispatch();
  const foodList = useSelector(selectFoodList) || []; // Ensure foodList is an array
  const status = useSelector((state) => state.foodList.status);
  const error = useSelector((state) => state.foodList.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFoodList());
    }
  }, [dispatch, status]);

  return (
    <div>
      {status === 'loading' && <p>Loading food list...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(foodList) &&
            foodList
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
      )}
    </div>
  );
};

export default FoodDisplay;
