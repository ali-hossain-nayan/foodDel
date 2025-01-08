import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItems } from '../../store/cartSlic/foodListSlice';
import { assets } from '../../assets/assets';

const FoodItem = ({ id, name, price, description, image }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const url = "http://localhost:4001"

    const handleAddToCart = () => {
        dispatch(addToCart({ itemId: id }));
    };

    const handleRemoveFromCart = () => {
        if (cartItems[id] > 0) {
            dispatch(removeFromCart({ itemId: id }));
        }
    };

    return (
        <div className="mt-10 flex flex-col items-center bg-white shadow-md rounded-lg p-4 w-60 sm:w-80 hover:shadow-lg transition-shadow duration-300">
            <div className="mb-4">
                <img className="rounded-lg w-full h-48 object-cover" src={url + "/images/" + image} alt={name} />
                {!cartItems[id] ? (
                    <img
                        className="mt-2 cursor-pointer transition"
                        src={assets.add_icon_white}
                        onClick={handleAddToCart}
                        alt="Add to cart"
                    />
                ) : (
                    <div>
                        <img
                            className="mt-2 cursor-pointer"
                            src={assets.add_icon_green}
                            onClick={handleAddToCart}
                            alt="Add more"
                        />
                        <p>{cartItems[id]}</p>
                        <img
                            className="mt-2 cursor-pointer"
                            src={assets.remove_icon_red}
                            onClick={handleRemoveFromCart}
                            alt="Remove from cart"
                        />
                    </div>
                )}
            </div>
            <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-600 mt-2">{description}</p>
                <p className="text-lg font-semibold text-green-600 mt-4">${price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default FoodItem;
