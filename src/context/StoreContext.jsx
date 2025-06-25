import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const baseURL = "http://localhost:4001";
    const [token, setToken] = useState('');
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));

        if (token) {
            await axios.post(baseURL + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    const removeCart = async (itemId) => {
        setCartItems((prev) => {
            const updated = { ...prev };
            if (updated[itemId] > 1) updated[itemId] -= 1;
            else delete updated[itemId];
            return updated;
        });

        if (token) {
            await axios.post(baseURL + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    const loadCartData = async (token) => {
        try {
            const callAPI = await axios.post(baseURL + "/api/cart/get", {}, { headers: { token } });
            setCartItems(callAPI.data.cartData || {});
        } catch (error) {
            console.error("Failed to load cart data", error);
            setCartItems({});
        }
    };

    const getTotalCartAmount = () => {
        let totalCartAmount = 0;
        for (let item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalCartAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalCartAmount;
    };

    const fetchFoodList = async () => {
        try {
            const callAPI = await axios.get(baseURL + '/api/food/list');
            setFoodList(callAPI.data.data);
        } catch (error) {
            console.error("Failed to fetch food list", error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();
            const savedToken = localStorage.getItem('token');
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
            }
        };
        loadData();
    }, []);

    const contextValue = {
        food_list,
        addToCart,
        removeCart,
        cartItems,
        setCartItems,
        getTotalCartAmount,
        baseURL,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;